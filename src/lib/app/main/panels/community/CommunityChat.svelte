<script lang="ts">
    import { loadCommunitiesData } from 'utilities/communities';
    import {
        chatRequestAccepted,
        communityData,
        replyingTo,
        replyingToId,
        sendContent,
        communityMessages as messages,
        targetSendHeight,
    } from 'stores/community';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { scale } from 'svelte/transition';
    import {
        dismissModal,
        getTimeDifferenceM,
        setProgressBar,
        showModal,
        switchPanel,
    } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import {
        ModalTypes,
        modalVisible,
        targetMessageModal,
        targetMessageModalProfile,
    } from 'stores/modals';
    import type { CommunityMessage, FronvoAccount } from 'interfaces/all';
    import Message from '$lib/app/reusables/communities/Message.svelte';
    import linkifyHtml from 'linkify-html';
    import { cachedAccountData, socket } from 'stores/main';
    import { shiftHeld } from 'stores/actions';
    import { loadOurProfile } from 'utilities/profile';
    import { PanelTypes } from 'stores/panels';
    import MessageSmall from '$lib/app/reusables/communities/MessageSmall.svelte';
    import InfiniteLoading from 'svelte-infinite-loading';

    let unsubscribe: Unsubscriber;
    let unsubscribe2: Unsubscriber;

    let animationsEnabled = true;

    async function loadMore({ detail: { loaded, complete } }): Promise<void> {
        if (animationsEnabled) {
            window.scrollTo(0, document.body.scrollHeight);
            loaded();
            return;
        }

        socket.emit(
            'fetchCommunityMessages',
            {
                from: $messages.length.toString(),
                to: ($messages.length + 30).toString(),
            },
            ({ communityMessages }) => {
                if (communityMessages.length == 0) {
                    complete();
                    return;
                }

                $messages = communityMessages.concat($messages);

                loaded();
            }
        );
    }

    async function addMessageLinks(): Promise<void> {
        if ($messages.length == 0) return;

        function findLinkElements(
            messageId: string,
            content: string,
            isReply: boolean,
            replyContent?: string
        ): void {
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

                // For replies too, if the message has one
                if (!isReply) return;

                const replyElement = document.getElementsByClassName(
                    messageId + '-reply'
                )[0];

                if (!replyElement) return;

                replyElement.innerHTML =
                    '> ' +
                    linkifyHtml(replyContent, {
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
                message.message.content,
                message.message.isReply,
                message.message.replyContent
            );
        }
    }

    function sendMessage(): void {
        socket.emit(
            'sendCommunityMessage',
            {
                message: $sendContent,
                replyId: $replyingToId,
            },
            () => {
                $sendContent = '';

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

    function deleteMessage(
        message: CommunityMessage,
        profileData: FronvoAccount
    ): void {
        // The image is red, user should've known
        if ($shiftHeld) {
            // Will recieve result in CommunityChat listener if successful
            socket.emit('deleteCommunityMessage', {
                messageId: message.messageId,
            });
        } else {
            $targetMessageModal = message;
            $targetMessageModalProfile = profileData;

            showModal(ModalTypes.DeleteMessage);
        }
    }

    function replyMessage(
        profileData: FronvoAccount,
        messageData: CommunityMessage
    ): void {
        // Update reply info
        $replyingTo = profileData.username;

        $replyingToId = messageData.messageId;
    }

    function attachNewMessageListener(): void {
        // Remove previous listeners
        socket.off('newCommunityMessage');

        socket.on('newCommunityMessage', ({ newMessageData }) => {
            $messages.push(newMessageData);
            $messages = $messages;

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

                    $communityData.totalMessages -= 1;

                    // DeleteMessageModal
                    if (
                        $targetMessageModal?.messageId ==
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

        if (!($ourData.profileId == $communityData?.ownerId)) {
            socket.on('communityDeleted', async () => {
                switchPanel(PanelTypes.Home);

                await loadCommunitiesData(
                    await loadOurProfile($cachedAccountData)
                );
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
            if ($communityData.ownerId != $ourData.profileId) {
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
        socket.off('memberJoined');
        socket.off('memberLeft');

        socket.on('memberJoined', ({ profileId }) => {
            $communityData?.members.push(profileId);
        });

        socket.on('memberLeft', async ({ profileId }) => {
            // Another client / kicked / banned
            if (profileId == $ourData.profileId) {
                switchPanel(PanelTypes.Home);

                await loadCommunitiesData(
                    await loadOurProfile($cachedAccountData)
                );
            } else {
                $communityData?.members.splice(
                    $communityData?.members.indexOf(profileId),
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

        if (!$chatRequestAccepted && $communityData?.chatRequestsEnabled) {
            return;
        }

        // Send message this way
        if (
            event.key == 'Enter' &&
            contentInput.value.trim() != '' &&
            $sendContent.length > 0 &&
            $sendContent.length <= 500
        ) {
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
        if (!$chatRequestAccepted && $communityData?.chatRequestsEnabled) {
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

        unsubscribe2 = messages.subscribe(() => {
            addMessageLinks();
        });

        // Efficient send
        document.addEventListener('keydown', keyDownListener);

        setProgressBar(false);

        setTimeout(() => {
            animationsEnabled = false;
        }, 250);
    });

    onDestroy(() => {
        unsubscribe();
        unsubscribe2();

        document.removeEventListener('keydown', keyDownListener);

        // Limit load after reloading the community panel
        $messages = $messages.slice(-40);
    });
</script>

{#if $messages}
    <div class="chat-container">
        {#if $messages.length == 0}
            <h1 id="chat-start" in:scale={{ duration: 500, start: 0.95 }}>
                Welcome to {$communityData?.name}'s chat room!
            </h1>
        {:else if $messages}
            <InfiniteLoading
                on:infinite={loadMore}
                direction="top"
                forceUseInfiniteWrapper
                distance={1000}
            >
                <div slot="noMore" /></InfiniteLoading
            >

            {#each $messages as { message, profileData }, i}
                <!-- Same author, less than 30 minutes ago -->
                {#if $messages[i - 1]?.message.ownerId == profileData.profileId && getTimeDifferenceM(new Date(message.creationDate), new Date($messages[i - 1]?.message.creationDate)) < 30}
                    <MessageSmall
                        {profileData}
                        messageData={message}
                        replyCondition={$chatRequestAccepted ||
                            !$communityData?.chatRequestsEnabled}
                        replyCallback={() => replyMessage(profileData, message)}
                        deleteCondition={$communityData?.ownerId ==
                            $ourData?.profileId ||
                            message.ownerId == $ourData?.profileId}
                        deleteCallback={() =>
                            deleteMessage(message, profileData)}
                        animate={animationsEnabled}
                    />
                {:else}
                    <Message
                        {profileData}
                        messageData={message}
                        replyCondition={$chatRequestAccepted ||
                            !$communityData?.chatRequestsEnabled}
                        replyCallback={() => replyMessage(profileData, message)}
                        deleteCondition={$communityData?.ownerId ==
                            $ourData?.profileId ||
                            message.ownerId == $ourData?.profileId}
                        deleteCallback={() =>
                            deleteMessage(message, profileData)}
                        animate={animationsEnabled}
                    />
                {/if}
            {/each}
        {/if}
    </div>
{/if}

<style>
    .chat-container {
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
        font-size: 2rem;
        margin-bottom: 20px;
        text-align: center;
        width: 100%;
    }

    @media screen and (max-width: 700px) {
        .chat-container #chat-start {
            font-size: 1.5rem;
        }
    }
</style>
