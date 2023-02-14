<script lang="ts">
    import DeleteChatOption from '$lib/svgs/DeleteChatOption.svelte';
    import { dataSaver, socket } from 'stores/all';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import {
        chatRequestAccepted,
        joinedCommunity,
        replyingTo,
        replyingToId,
        sendContent,
        communityMessages as messages,
        targetSendHeight,
    } from 'stores/communities';
    import {
        cachedAccountData,
        dropdownVisible,
        modalVisible,
        targetCommunityMember,
        targetConfirmCommunityMessage,
    } from 'stores/main';
    import { onDestroy, onMount } from 'svelte';
    import Time from 'svelte-time';
    import type { Unsubscriber } from 'svelte/store';
    import { scale } from 'svelte/transition';
    import {
        dismissDropdown,
        dismissModal,
        setProgressBar,
        showDropdown,
        showModal,
    } from 'utilities/main';
    import linkifyHtml from 'linkify-html';
    import Reply from '$lib/svgs/Reply.svelte';
    import { ourProfileData } from 'stores/profile';
    import { DropdownTypes, ModalTypes } from 'types/main';
    import { loadProfilePanel } from 'utilities/profile';
    import type { FronvoAccount } from 'interfaces/all';

    let unsubscribe: Unsubscriber;

    let showLoadMore = true;
    let isLoadingMore = false;

    async function addMessageLinks(): Promise<void> {
        if ($messages.length == 0) {
            setProgressBar(false);
            return;
        }

        function findLinkElements(messageId: string, content: string): void {
            setTimeout(() => {
                const targetElement =
                    document.getElementsByClassName(messageId)[0];

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

        for (const messageIndex in $messages) {
            const message = $messages[messageIndex];

            findLinkElements(
                message.message.messageId,
                message.message.content
            );
        }

        setProgressBar(false);
    }

    function loadMore(): void {
        if (isLoadingMore) return;

        isLoadingMore = true;
        setProgressBar(true);

        socket.emit(
            'fetchCommunityMessages',
            {
                from: $messages.length.toString(),
                to: ($messages.length + 30).toString(),
            },
            ({ communityMessages }) => {
                $messages.push(...communityMessages);
                $messages = $messages;

                addMessageLinks();

                isLoadingMore = false;

                showLoadMore =
                    $messages.length < $joinedCommunity.totalMessages;
            }
        );
    }

    function editAuthorProfile(profileData: FronvoAccount): void {
        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            $targetCommunityMember = profileData;

            showDropdown(DropdownTypes.CommunityMember);
        }
    }

    function sendMessage(): void {
        socket.emit(
            'sendCommunityMessage',
            {
                message: $sendContent,
                replyId: $replyingToId,
            },
            ({ err }) => {
                if (err) {
                    setProgressBar(false);
                } else {
                    $sendContent = '';
                }

                const contentInput = document.getElementById(
                    'textarea-content'
                ) as HTMLTextAreaElement;

                setTimeout(() => {
                    contentInput.disabled = false;
                    contentInput.focus();
                }, 0);
            }
        );

        // Reset reply info
        $replyingTo = undefined;
        $replyingToId = undefined;
    }

    function deleteMessage(messageIndex: number): void {
        $targetConfirmCommunityMessage = $messages[messageIndex].message;

        showModal(ModalTypes.ConfirmDeleteMessage);
    }

    function replyMessage(messageIndex: number): void {
        // Update reply info
        $replyingTo = $messages[messageIndex].profileData.username;

        $replyingToId = $messages[messageIndex].message.messageId;
    }

    function attachNewMessageListener(): void {
        // Remove previous listeners
        socket.off('newCommunityMessage');

        socket.on('newCommunityMessage', ({ newMessageData }) => {
            $messages = [newMessageData].concat($messages);

            addMessageLinks();
        });
    }

    function attachDeletedMessageListener(): void {
        socket.off('communityMessageDeleted');

        socket.on('communityMessageDeleted', ({ messageId }) => {
            for (const messageIndex in $messages) {
                const targetMessage = $messages[messageIndex];

                if (targetMessage.message.messageId == messageId) {
                    $messages.splice(Number(messageIndex), 1);
                    $messages = $messages;

                    $joinedCommunity.totalMessages -= 1;

                    // ConfirmDeleteMessageModal
                    if (
                        $targetConfirmCommunityMessage?.messageId ==
                        targetMessage.message.messageId
                    ) {
                        dismissModal();
                    }

                    if ($replyingToId == targetMessage.message.messageId) {
                        $replyingTo = undefined;
                        $replyingToId = undefined;
                    }

                    addMessageLinks();

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
        socket.off('communityChatRequestsUpdated');

        socket.on('chatRequestUpdated', ({ accepted }) => {
            adjustContentInput(accepted);
        });

        socket.on('communityChatRequestsUpdated', ({ state }) => {
            // not state = not required = always have chat request perm
            // state = required = dont have chat request perm

            // Bypass if the owner
            if ($joinedCommunity.ownerId != $ourProfileData.profileId) {
                adjustContentInput(!state);
            }
        });

        function adjustContentInput(chatRequestState: boolean): void {
            const contentInput = document.getElementById(
                'textarea-content'
            ) as HTMLTextAreaElement;

            if (!chatRequestState) {
                contentInput.disabled = true;
                contentInput.value = 'Chat request pending';
            } else {
                contentInput.disabled = false;
                contentInput.value = '';
                $sendContent = '';
            }

            $chatRequestAccepted = chatRequestState;
        }
    }

    function attachMemberChangeListener(): void {
        socket.on('memberJoined', ({ profileId }) => {
            $joinedCommunity?.members.push(profileId);
        });

        socket.on('memberLeft', ({ profileId }) => {
            // Another client / kicked / banned
            if (profileId == $ourProfileData.profileId) {
                loadCommunitiesPanel();
            } else {
                $joinedCommunity?.members.splice(
                    $joinedCommunity?.members.indexOf(profileId),
                    1
                );
            }
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

        if (!$chatRequestAccepted && $joinedCommunity.chatRequestsEnabled) {
            return;
        }

        // Send message this way
        if (
            event.key == 'Enter' &&
            contentInput.value.trim() != '' &&
            $sendContent.length > 0 &&
            $sendContent.length <= 500
        ) {
            setProgressBar(true);

            // Reset text
            contentInput.disabled = true;

            sendMessage();

            return;
        } else {
            if (event.key == 'Enter') {
                event.preventDefault();
            }
        }

        contentInput.focus();
    }

    function checkChatRequest(): void {
        if (!$chatRequestAccepted && $joinedCommunity.chatRequestsEnabled) {
            const contentInput = document.getElementById(
                'textarea-content'
            ) as HTMLTextAreaElement;

            contentInput.disabled = true;
            contentInput.value = 'Chat request pending';
        }
    }

    onMount(() => {
        // Reload listeners and messages
        checkChatRequest();
        addMessageLinks();
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

{#if $messages}
    <div class="chat-container">
        {#if $messages.length == 0}
            <h1 id="chat-start" in:scale={{ duration: 500, start: 0.95 }}>
                Welcome to {$joinedCommunity?.name}'s chat room!
            </h1>
        {:else if $messages}
            {#each $messages as { message, profileData }, i}
                <div class="message-container">
                    <div class="message-info-container">
                        <img
                            id="avatar"
                            draggable={false}
                            on:click={() => editAuthorProfile(profileData)}
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

                            <!-- Only the message author / community owner can delete messages -->
                            {#if $joinedCommunity?.ownerId == $ourProfileData.profileId || message.ownerId == $ourProfileData.profileId}
                                <DeleteChatOption
                                    callback={() => deleteMessage(i)}
                                />
                            {/if}
                        </div>
                    </div>

                    {#if message.isReply}
                        <div class="reply-container">
                            {#if message.replyContent}
                                <h1 id="reply-name">
                                    Replying to <span
                                        >{profileData.username}</span
                                    >
                                </h1>
                                <h1 id="reply-message">
                                    > <span>{message.replyContent}</span>
                                </h1>
                            {:else}
                                <h1 id="reply-name">
                                    Replying to <span>an unknown message</span>
                                </h1>
                            {/if}
                        </div>
                    {/if}

                    <h1 id="content" class={message.messageId}>
                        {message.content}
                    </h1>

                    <h1 id="creation-date">
                        <!-- Updates every 15 seconds -->
                        <Time
                            relative
                            format={'dddd HH:mm · MMMM D YYYY'}
                            live={15000}
                            timestamp={message.creationDate}
                        />
                    </h1>
                </div>
            {/each}

            {#if $joinedCommunity && showLoadMore}
                {#if $messages.length < $joinedCommunity.totalMessages}
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
        font-size: 1.6rem;
        margin-bottom: 35px;
        margin-top: 20px;
    }

    .message-container {
        display: flex;
        flex-direction: column;
        width: 95%;
        border-radius: 30px;
        padding: 10px;
    }

    .message-container:nth-child(1) {
        margin-top: 10px;
    }

    .message-container:nth-last-child(1) {
        margin-bottom: 35px;
    }

    .message-container:hover {
        background: var(--accent_bg_color);
        box-shadow: 0 0 15px var(--accent_shadow_color);
    }

    .message-info-container {
        display: flex;
        align-items: center;
    }

    .message-info-container #avatar {
        width: 48px;
        height: 48px;
        border-radius: 5px;
        margin-right: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
    }

    .message-info-container #username {
        color: var(--profile_info_color);
        margin: 0;
        font-size: 1.6rem;
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
        transition: 100ms;
    }

    .reply-container #reply-name {
        font-size: 1.3rem;
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
        margin: 0;
        font-size: 1.2rem;
        overflow: hidden;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .reply-container #reply-message span {
        color: var(--profile_info_color);
    }

    .message-container:hover .message-info-container .menu-container {
        opacity: 1;
    }

    .message-container #content {
        color: var(--profile_info_color);
        margin: 0;
        margin-left: 2px;
        font-size: 1.4rem;
        white-space: pre-wrap;
        overflow: hidden;
    }

    :global(.message-container #content .link) {
        text-decoration: none;
        color: var(--text_color);
    }

    .message-container #creation-date {
        font-size: 1.1rem;
        margin: 0;
        margin-top: 5px;
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

        .message-info-container #avatar {
            cursor: default;
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
