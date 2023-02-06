<script lang="ts">
    import type {
        CommunityMessage,
        CommunityMessageFinal,
    } from 'interfaces/all';
    import type { FronvoAccount } from 'interfaces/all';
    import DeleteChatOption from '$lib/svgs/DeleteChatOption.svelte';
    import { dataSaver, socket } from 'stores/all';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import {
        chatRequestAccepted,
        joinedCommunity,
        replyingTo,
        replyingToId,
        sendContent,
        targetCommunityMessages,
        targetSendHeight,
    } from 'stores/communities';
    import {
        cachedAccountData,
        modalVisible,
        queuedAccounts,
        targetConfirmCommunityMessage,
    } from 'stores/main';
    import { onDestroy, onMount } from 'svelte';
    import Time from 'svelte-time';
    import type { Unsubscriber } from 'svelte/store';
    import { scale } from 'svelte/transition';
    import {
        dismissModal,
        fetchUser,
        setProgressBar,
        showModal,
    } from 'utilities/main';
    import linkifyHtml from 'linkify-html';
    import Reply from '$lib/svgs/Reply.svelte';
    import { ourProfileData } from 'stores/profile';
    import { ModalTypes } from 'types/main';

    // Prevent massive data requests
    let loadedAccounts = 0;

    let unsubscribe: Unsubscriber;

    // Messages finalised with profile info
    let finalizedMessages: CommunityMessageFinal[] = [];

    let showLoadMore = false;
    let isLoadingMore = false;

    function findCachedData(profileId: string): FronvoAccount | undefined {
        for (const accountIndex in $cachedAccountData) {
            const targetAccount = $cachedAccountData[accountIndex];

            if (targetAccount.profileId == profileId) {
                return targetAccount;
            }
        }
    }

    function findMessageById(messageId: string): CommunityMessage | undefined {
        for (const messageIndex in $targetCommunityMessages) {
            const targetMessage = $targetCommunityMessages[messageIndex];

            if (targetMessage.messageId == messageId) {
                return targetMessage;
            }
        }
    }

    async function loadMessageAuthors(): Promise<void> {
        // Reset counter, helps combat loadMore errors
        loadedAccounts = 0;

        for (const messageIndex in $targetCommunityMessages) {
            const message = $targetCommunityMessages[messageIndex];

            // No duplicates
            if ($queuedAccounts.includes(message.ownerId)) {
                loadedAccounts += 1;

                checkLoadingDone();

                continue;
            }

            $queuedAccounts.push(message.ownerId);

            const account = await fetchUser(message.ownerId);

            $cachedAccountData.push(account);

            loadedAccounts += 1;

            checkLoadingDone();
        }

        function checkLoadingDone(): void {
            if (loadedAccounts == $targetCommunityMessages.length) {
                loadMessages();
            }
        }
    }

    async function loadMessages(): Promise<void> {
        const tempFinalizedMessages: CommunityMessageFinal[] = [];

        if ($targetCommunityMessages.length == 0) {
            finalizedMessages = [];
            setProgressBar(false);
            return;
        }

        for (const messageIndex in $targetCommunityMessages) {
            const message = $targetCommunityMessages[messageIndex];

            // No extra latency, preloaded
            let cachedAccount = findCachedData(message.ownerId);

            // Read from cache already, proceed
            tempFinalizedMessages.push({
                ...message,
                profileData: cachedAccount,
            });

            // As mentioned above, no latency means it WILL work 100%, div will be visible
            generateContentLinks(message.messageId, message.content);

            checkLoadingDone();
        }

        function checkLoadingDone(): void {
            if (
                tempFinalizedMessages.length == $targetCommunityMessages.length
            ) {
                // Update messages
                finalizedMessages = tempFinalizedMessages;

                if (!showLoadMore) showLoadMore = true;

                setProgressBar(false);
            }
        }
    }

    function loadMore(): void {
        if (isLoadingMore) return;

        isLoadingMore = true;
        setProgressBar(true);

        socket.emit(
            'fetchCommunityMessages',
            {
                from: $targetCommunityMessages.length.toString(),
                to: ($targetCommunityMessages.length + 30).toString(),
            },
            ({ communityMessages }) => {
                $targetCommunityMessages.push(...communityMessages);

                loadMessageAuthors();

                isLoadingMore = false;
            }
        );
    }

    function sendMessage(): void {
        socket.emit('sendCommunityMessage', {
            message: $sendContent,
            replyId: $replyingToId,
        });

        // Reset reply info
        $replyingTo = undefined;
        $replyingToId = undefined;
    }

    function deleteMessage(messageIndex: number): void {
        $targetConfirmCommunityMessage = finalizedMessages[messageIndex];

        showModal(ModalTypes.ConfirmDeleteMessage);
    }

    function replyMessage(messageIndex: number): void {
        // Update reply info
        $replyingTo = findCachedData(
            finalizedMessages[messageIndex].ownerId
        ).username;
        $replyingToId = finalizedMessages[messageIndex].messageId;
    }

    function attachNewMessageListener(): void {
        // Remove previous listeners
        socket.off('newCommunityMessage');

        socket.on('newCommunityMessage', ({ newMessageData }) => {
            $targetCommunityMessages = [newMessageData].concat(
                $targetCommunityMessages
            );

            loadMessageAuthors();
        });
    }

    function attachDeletedMessageListener(): void {
        socket.off('communityMessageDeleted');

        socket.on('communityMessageDeleted', ({ messageId }) => {
            for (const messageIndex in $targetCommunityMessages) {
                const targetMessage = $targetCommunityMessages[messageIndex];

                if (targetMessage.messageId == messageId) {
                    $targetCommunityMessages.splice(Number(messageIndex), 1);
                    $joinedCommunity.totalMessages -= 1;

                    if (
                        $targetConfirmCommunityMessage?.messageId ==
                        targetMessage.messageId
                    ) {
                        dismissModal();
                    }

                    if ($replyingToId == targetMessage.messageId) {
                        $replyingTo = undefined;
                        $replyingToId = undefined;
                    }

                    loadMessageAuthors();

                    break;
                }
            }
        });
    }

    function attachCommunityDeletedListener(): void {
        socket.off('communityDeleted');

        if (!($ourProfileData.profileId == $joinedCommunity.ownerId)) {
            socket.on('communityDeleted', async () => {
                await loadCommunitiesPanel();
            });
        }
    }

    function attachChatRequestListener(): void {
        socket.off('chatRequestUpdated');

        socket.on('chatRequestUpdated', ({ accepted }) => {
            const contentInput = document.getElementById(
                'textarea-content'
            ) as HTMLTextAreaElement;

            if (!accepted) {
                contentInput.disabled = true;
                contentInput.value = 'Chat request pending';
            } else {
                contentInput.disabled = false;
                contentInput.value = '';
                $sendContent = '';
            }

            $chatRequestAccepted = accepted;
        });
    }

    function attachMemberChangeListener(): void {
        socket.on('memberJoined', ({ profileId }) => {
            $joinedCommunity?.members.push(profileId);
        });

        socket.on('memberLeft', ({ profileId }) => {
            $joinedCommunity?.members.splice(
                $joinedCommunity?.members.indexOf(profileId),
                1
            );
        });
    }

    async function keyDownListener(event: KeyboardEvent): Promise<void> {
        if ($modalVisible) return;

        if (
            event.ctrlKey ||
            event.shiftKey ||
            event.key.startsWith('Page') ||
            event.key.startsWith('Arrow')
        ) {
            return;
        }

        const contentInput = document.getElementById(
            'textarea-content'
        ) as HTMLTextAreaElement;

        if (!$chatRequestAccepted) {
            return;
        }

        // Send message this way
        if (event.key == 'Enter' && $sendContent.length <= 500) {
            setProgressBar(true);

            // Reset text
            contentInput.disabled = true;

            sendMessage();

            contentInput.value = '';
            $sendContent = '';

            setTimeout(() => {
                contentInput.disabled = false;
                contentInput.focus();
            }, 0);

            return;
        }

        contentInput.focus();
    }

    function checkChatRequest(): void {
        if (!$chatRequestAccepted) {
            const contentInput = document.getElementById(
                'textarea-content'
            ) as HTMLTextAreaElement;

            contentInput.disabled = true;
            contentInput.value = 'Chat request pending';
        }
    }

    function generateContentLinks(messageId: string, content: string): void {
        setTimeout(() => {
            const targetElement = document.getElementsByClassName(messageId)[0];

            if (!targetElement) return;

            targetElement.innerHTML = linkifyHtml(content, {
                className: 'link',
                truncate: 40,
                validate: {
                    url: (value) =>
                        /^https?:\/\/[0-9a-zA-Z-.\/\?=]+/.test(value),
                },
                target: '_blank',
            });
        }, 0);
    }

    onMount(() => {
        // Reload listeners and messages
        checkChatRequest();
        loadMessageAuthors();
        attachChatRequestListener();
        attachNewMessageListener();
        attachDeletedMessageListener();
        attachCommunityDeletedListener();
        attachMemberChangeListener();

        // Adjustable margin
        unsubscribe = targetSendHeight.subscribe((newHeight) => {
            const chatContainer = document.getElementsByClassName(
                'chat-container'
            )[0] as HTMLDivElement;

            chatContainer.style.marginBottom = `${
                $replyingTo ? newHeight + 50 : newHeight
            }px`;
        });

        // Efficient send
        document.addEventListener('keydown', keyDownListener);
    });

    onDestroy(() => {
        unsubscribe();

        document.removeEventListener('keydown', keyDownListener);
    });
</script>

{#if $targetCommunityMessages}
    <div class="chat-container">
        {#if $targetCommunityMessages.length == 0}
            <h1 id="chat-start" in:scale={{ duration: 500, start: 0.95 }}>
                Welcome to {$joinedCommunity?.name}'s chat room!
            </h1>
        {:else if finalizedMessages}
            {#each finalizedMessages as { messageId, profileData, content, creationDate, isReply, replyId }, i}
                <div class="message-container">
                    <div class="message-info-container">
                        <img
                            id="avatar"
                            draggable={false}
                            src={profileData.avatar && !$dataSaver
                                ? profileData.avatar
                                : '/svgs/profile/avatar.svg'}
                            alt={`${profileData.username}'s avatar`}
                        />
                        <h1 id="username">{profileData.username}</h1>

                        <div class="menu-container">
                            <!-- Anyone can reply, if the chat request is accepted -->
                            {#if $chatRequestAccepted}
                                <Reply callback={() => replyMessage(i)} />
                            {/if}

                            <!-- Only the community owner can delete messages -->
                            {#if $joinedCommunity?.ownerId == $ourProfileData.profileId}
                                <DeleteChatOption
                                    callback={() => deleteMessage(i)}
                                />
                            {/if}
                        </div>
                    </div>

                    {#if isReply}
                        <div class="reply-container">
                            {#if findMessageById(replyId)}
                                <h1 id="reply-name">
                                    Replying to <span
                                        >{findCachedData(
                                            findMessageById(replyId).ownerId
                                        ).username}</span
                                    >
                                </h1>
                                <h1 id="reply-message">
                                    {findMessageById(replyId).content}
                                </h1>
                            {:else}
                                <h1 id="reply-name">
                                    Replying to <span>an unknown message</span>
                                </h1>
                            {/if}
                        </div>
                    {/if}

                    <h1 id="content" class={messageId}>
                        {content}
                    </h1>

                    <h1 id="creation-date">
                        <!-- Updates every 15 seconds -->
                        <Time
                            relative
                            format={'dddd HH:mm · MMMM D YYYY'}
                            live={15000}
                            timestamp={creationDate}
                        />
                    </h1>
                </div>
            {/each}

            {#if $joinedCommunity && showLoadMore}
                {#if $targetCommunityMessages.length < $joinedCommunity.totalMessages}
                    <button id="more" on:click={loadMore}>Load more</button>
                {/if}
            {/if}
        {/if}
    </div>
{/if}

<style>
    .chat-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 90px;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
    }

    .chat-container #chat-start {
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 2.2rem;
        margin-bottom: 20px;
        text-align: center;
        width: 100%;
    }

    .chat-container #more {
        width: max-content;
        margin: auto;
        font-size: 2rem;
        margin-bottom: 35px;
        margin-top: 20px;
    }

    .message-container {
        display: flex;
        flex-direction: column;
        width: 90%;
        height: min-content;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 5px;
    }

    .message-container:nth-child(1) {
        margin-top: 10px;
    }

    .message-container:nth-last-child(1) {
        margin-bottom: 35px;
    }

    .message-container:hover {
        background: var(--accent_bg_color);
        box-shadow: 0 0 10px var(--accent_shadow_color);
    }

    .message-info-container {
        display: flex;
        align-items: center;
    }

    .message-info-container #avatar {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .message-info-container #username {
        color: var(--profile_info_color);
        margin: 0;
        font-size: 1.9rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        flex: 1;
    }

    .message-info-container .menu-container {
        opacity: 0;
        transition: 200ms;
    }

    .reply-container {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .reply-container #reply-name {
        font-size: 1.6rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .reply-container #reply-name span {
        color: var(--profile_info_color);
    }

    .reply-container #reply-message {
        color: var(--profile_info_color);
        margin: 0;
        font-size: 1.3rem;
        margin-left: 10px;
        overflow: hidden;
    }

    .message-container:hover .message-info-container .menu-container {
        opacity: 1;
    }

    .message-container #content {
        color: var(--profile_info_color);
        margin: 0;
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 1.7rem;
        white-space: pre-wrap;
        overflow: hidden;
    }

    :global(.message-container #content .link) {
        text-decoration: none;
        color: var(--text_color);
    }

    :global(.message-container #content .link:hover::after) {
        background: var(--profile_info_color);
    }

    .message-container #creation-date {
        font-size: 1.3rem;
        margin: 0;
        margin-top: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 720px) {
        .chat-container {
            margin-top: 80px;
        }

        .chat-container #chat-start {
            font-size: 1.8rem;
        }

        .chat-container #more {
            font-size: 1.8rem;
        }

        .message-container #username {
            font-size: 1.7rem;
        }

        .reply-container #reply-name {
            font-size: 1.4rem;
        }

        .reply-container #reply-message {
            font-size: 1.2rem;
        }

        .message-container #content {
            font-size: 1.5rem;
        }

        .message-container #creation-date {
            font-size: 1.2rem;
        }

        .message-info-container .menu-container {
            opacity: 1;
        }
    }

    @media screen and (max-width: 520px) {
        .chat-container {
            margin-top: 60px;
        }

        .chat-container #chat-start {
            font-size: 1.5rem;
        }

        .chat-container #more {
            font-size: 1.4rem;
        }

        .message-container #avatar {
            width: 48px;
            height: 48px;
        }

        .message-container #username {
            font-size: 1.5rem;
        }

        .reply-container #reply-name {
            font-size: 1.3rem;
        }

        .reply-container #reply-message {
            font-size: 1.1rem;
        }

        .message-container #content {
            font-size: 1.3rem;
        }

        .message-container #creation-date {
            font-size: 1.1rem;
        }
    }
</style>
