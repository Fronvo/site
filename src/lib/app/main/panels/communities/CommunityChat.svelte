<script lang="ts">
    import { goto } from '$app/navigation';
    import type {
        CommunityMessage,
        CommunityMessageFinal,
    } from 'interfaces/app/communities';
    import type { FronvoAccount } from 'interfaces/app/main';
    import DeleteChatOption from '$lib/svgs/DeleteChatOption.svelte';
    import { socket } from 'stores/global';
    import { loadCommunitiesPanel } from 'utilities/app/communities';
    import {
        chatRequestAccepted,
        initialCommunityLoadingFinished,
        joinedCommunity,
        maxChatAnimDelay,
        ourProfileData,
        replyingTo,
        replyingToId,
        sendContent,
        targetCommunity,
        targetCommunityData,
        targetCommunityMessages,
        targetSendHeight,
    } from 'stores/app/communities';
    import { modalVisible } from 'stores/app/main';
    import { onDestroy, onMount } from 'svelte';
    import Time from 'svelte-time';
    import type { Unsubscriber } from 'svelte/store';
    import { fly, scale } from 'svelte/transition';
    import { fetchUser } from 'utilities/app/main';
    import linkifyHtml from 'linkify-html';
    import Reply from 'src/lib/svgs/Reply.svelte';

    let animationsFinished = false;

    // Prevent massive data requests
    const cachedAccountData: FronvoAccount[] = [];

    let unsubscribe: Unsubscriber;

    // Messages finalised with profile info
    let finalizedMessages: CommunityMessageFinal[] = [];

    function findCachedData(profileId: string): FronvoAccount | undefined {
        for (const accountIndex in cachedAccountData) {
            const targetAccount = cachedAccountData[accountIndex];

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

    async function loadMessages(): Promise<void> {
        const tempFinalizedMessages: CommunityMessageFinal[] = [];

        if ($targetCommunityMessages.length == 0) {
            finalizedMessages = [];
            return;
        }

        for (const messageIndex in $targetCommunityMessages) {
            const message = $targetCommunityMessages[messageIndex];

            const cachedAccount = findCachedData(message.ownerId);

            if (!cachedAccount) {
                await fetchUser(message.ownerId).then((account) => {
                    // Add profileData
                    tempFinalizedMessages.push({
                        ...message,
                        profileData: account,
                    });

                    // Update cache
                    cachedAccountData.push(account);

                    generateContentLinks(message.messageId, message.content);

                    checkLoadingDone();
                });
            } else {
                // Read from cache already, proceed
                tempFinalizedMessages.push({
                    ...message,
                    profileData: cachedAccount,
                });

                generateContentLinks(message.messageId, message.content);

                checkLoadingDone();
            }
        }

        function checkLoadingDone(): void {
            if (
                tempFinalizedMessages.length == $targetCommunityMessages.length
            ) {
                // Finally, reverse the order
                // tempFinalizedMessages.reverse();

                // Update messages
                finalizedMessages = tempFinalizedMessages;

                // No delay for new messages
                setTimeout(() => {
                    animationsFinished = true;
                }, $maxChatAnimDelay);
            }
        }
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
        // Will recieve result in listener if successful
        socket.emit('deleteCommunityMessage', {
            messageId: $targetCommunityMessages[messageIndex].messageId,
        });

        for (const messageIndexLoop in $targetCommunityMessages) {
            const targetMessage = $targetCommunityMessages[messageIndexLoop];

            if (
                targetMessage.messageId ==
                $targetCommunityMessages[messageIndex].messageId
            ) {
                $targetCommunityMessages.splice(Number(messageIndex), 1);

                break;
            }
        }

        loadMessages();
    }

    function replyMessage(messageIndex: number): void {
        // Update reply info
        $replyingTo = findCachedData(
            finalizedMessages[messageIndex].ownerId
        ).username;
        $replyingToId = finalizedMessages[messageIndex].messageId;
    }

    function attachNewMessageListener(): void {
        socket.on('newCommunityMessage', ({ newMessageData }) => {
            $targetCommunityMessages =
                $targetCommunityMessages.concat(newMessageData);

            loadMessages();
        });
    }

    function attachDeletedMessageListener(): void {
        socket.on('communityMessageDeleted', ({ messageId }) => {
            if (!($ourProfileData.profileId == $joinedCommunity.ownerId)) {
                for (const messageIndex in $targetCommunityMessages) {
                    const targetMessage =
                        $targetCommunityMessages[messageIndex];

                    if (targetMessage.messageId == messageId) {
                        $targetCommunityMessages.splice(
                            Number(messageIndex),
                            1
                        );

                        break;
                    }
                }

                loadMessages();
            }
        });
    }

    function attachCommunityDeletedListener(): void {
        if (!($ourProfileData.profileId == $joinedCommunity.ownerId)) {
            socket.on('communityDeleted', () => {
                $targetCommunity = undefined;
                $targetCommunityData = undefined;
                $initialCommunityLoadingFinished = false;

                loadCommunitiesPanel();

                goto('/community', {
                    replaceState: true,
                });
            });
        }
    }

    function attachChatRequestListener(): void {
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
            $joinedCommunity.members.push(profileId);
        });

        socket.on('memberLeft', ({ profileId }) => {
            $joinedCommunity.members.splice(
                $joinedCommunity.members.indexOf(profileId),
                1
            );
        });
    }

    async function keyDownListener(event: KeyboardEvent): Promise<void> {
        if ($modalVisible) return;

        // Allow ctrl / shift combinations, dont handle
        if (event.ctrlKey || event.shiftKey) {
            return;
        }

        const contentInput = document.getElementById(
            'textarea-content'
        ) as HTMLTextAreaElement;

        if (!$chatRequestAccepted) {
            return;
        }

        // Send message this way
        if (event.key == 'Enter') {
            // Reset text
            contentInput.disabled = true;

            sendMessage();

            contentInput.value = '';
            $sendContent = '';

            await loadMessages();

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
        checkChatRequest();
        loadMessages();
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
        socket.off('chatRequestUpdated');
        socket.off('communityMessageDeleted');
        socket.off('newCommunityMessage');
        socket.off('communityDeleted');
        socket.off('memberJoined');
        socket.off('memberLeft');

        document.removeEventListener('keydown', keyDownListener);
    });
</script>

<div class="chat-container">
    {#if $targetCommunityMessages.length == 0}
        <h1 id="chat-start" in:scale={{ duration: 500, start: 0.95 }}>
            Welcome to {$joinedCommunity.name}'s chat room!
        </h1>
    {:else if finalizedMessages}
        {#each finalizedMessages as { messageId, profileData, content, creationDate, isReply, replyId }, i}
            <div
                class="message-container"
                in:fly={{
                    x: 10,
                    y: 25,
                    opacity: 0,
                    // easing: circInOut,
                    duration: 500,
                    delay: !animationsFinished
                        ? Math.min(
                              (finalizedMessages.length - i) * 50,
                              $maxChatAnimDelay
                          )
                        : 0,
                }}
            >
                <div class="message-info-container">
                    <img
                        id="avatar"
                        draggable={false}
                        src={profileData.avatar || '/svgs/profile/default.svg'}
                        alt={`${profileData.username}'s avatar`}
                    />
                    <h1 id="username">{profileData.username}</h1>

                    <div class="menu-container">
                        <!-- Only the community owner can delete messages -->
                        {#if $joinedCommunity?.ownerId == $ourProfileData.profileId}
                            <Reply callback={() => replyMessage(i)} />

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
                                Replying to <span>a deleted message</span>
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
    {/if}
</div>

<style>
    .chat-container {
        display: flex;
        flex-direction: column;
        flex-flow: column-reverse;
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

    .message-container {
        display: flex;
        flex-direction: column;
        width: 90%;
        height: min-content;
        border-radius: 10px;
        padding: 10px;
        transition: 200ms background;
        margin-bottom: 5px;
    }

    .message-container:nth-last-child(1) {
        margin-top: 10px;
    }

    .message-container:nth-child(1) {
        margin-bottom: 35px;
    }

    .message-container:hover {
        background: var(--nav_bg_color);
        box-shadow: 0 0 10px var(--nav_shadow_color);
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
        transition: 250ms;
    }

    .reply-container {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .reply-container #reply-name {
        font-size: 1.6rem;
        margin: 0;
    }

    .reply-container #reply-name span {
        color: var(--profile_info_color);
    }

    .reply-container #reply-message {
        color: var(--profile_info_color);
        margin: 0;
        font-size: 1.3rem;
        margin-left: 10px;
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
    }

    @media screen and (max-width: 520px) {
        .chat-container {
            margin-top: 60px;
        }

        .chat-container #chat-start {
            font-size: 1.5rem;
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
