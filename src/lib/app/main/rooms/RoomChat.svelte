<script lang="ts">
    import {
        getCachedMessages,
        getRoomMessages,
        isRoomCached,
        removeCachedMessage,
        removePendingMessage,
        sendImage,
        updateCachedMessages,
    } from 'utilities/rooms';
    import {
        replyingTo,
        replyingToId,
        currentRoomId,
        currentRoomData as roomData,
        currentRoomMessages as messages,
        currentRoomLoaded,
        sendingImage,
        isInServer,
        currentServer,
        currentChannel,
        cachedRooms,
        pendingMessages,
    } from 'stores/rooms';
    import { onDestroy, onMount } from 'svelte';
    import { isAcceptedImage, setTitle } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import Message from '$lib/app/reusables/rooms/Message.svelte';
    import { fronvoTitle, isMobile, lastSendsIn30, socket } from 'stores/main';
    import InfiniteLoading from 'svelte-infinite-loading';
    import type { Unsubscriber } from 'svelte/store';
    import type { NewMessageResult } from 'interfaces/account/newMessage';
    import { toast } from 'svelte-sonner';
    import { scale } from 'svelte/transition';
    import PropMessages from '$lib/app/reusables/rooms/PropMessages.svelte';

    let chat: HTMLDivElement;
    let unsubscribe: Unsubscriber;
    let canShowScroll = false;
    let previousEmpty = false;
    let isFirstLoad = true;
    let hideMessages = true;

    async function loadMore({ detail: { loaded } }): Promise<void> {
        if (previousEmpty) {
            loaded();

            return;
        } else {
            const roomId = $currentChannel?.channelId || $currentRoomId;
            const serverId = $currentServer?.serverId;

            // Not in cache, try loading
            if (
                !isRoomCached(
                    $currentChannel?.channelId || $currentRoomId,
                    $cachedRooms
                ) ||
                !isFirstLoad
            ) {
                const msgs = await getRoomMessages(
                    roomId,
                    $messages.length,
                    serverId
                );

                if (msgs.length == 0) {
                    isFirstLoad = false;
                    previousEmpty = true;

                    updateCachedMessages(roomId, msgs, $cachedRooms);

                    loaded();
                } else {
                    $messages = msgs.concat($messages);

                    loaded();

                    // Background update cache
                    updateCachedMessages(roomId, $messages, $cachedRooms);

                    setTimeout(() => {
                        chat.scrollTop = chat.scrollHeight;

                        hideMessages = false;
                    }, 0);
                }
            } else {
                isFirstLoad = false;

                // Check cache first
                const cachedMessages = getCachedMessages(roomId, $cachedRooms);

                // In cache, load in place
                $messages = cachedMessages;

                if (cachedMessages.length == 0) {
                    previousEmpty = true;
                }

                setTimeout(() => {
                    chat.scrollTop = chat.scrollHeight;

                    hideMessages = false;
                }, 0);
            }
        }
    }

    function attachNewMessageListener(): void {
        document.body.onfocus = () => {
            var link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');

                // @ts-ignore
                link.rel = 'icon';
                document.head.appendChild(link);
            }

            // @ts-ignore
            link.href = '/favicon.png';

            if ($fronvoTitle.includes('(1)')) {
                setTitle($fronvoTitle.replace(`(1)`, ''), true);
            }
        };

        function messageListener({
            roomId,
            newMessageData,
        }: NewMessageResult): void {
            if ($messages.includes(newMessageData)) return;

            if ($pendingMessages.includes(newMessageData.message.content)) {
                for (const messageIndex in $messages) {
                    let message = $messages[messageIndex];

                    if (
                        message.message.content ==
                        newMessageData.message.content
                    ) {
                        message = {
                            ...message,
                            ...newMessageData,
                        };

                        $messages[messageIndex] = message;

                        removePendingMessage(
                            newMessageData.message.content,
                            $pendingMessages
                        );

                        break;
                    }
                }
            } else if (
                ($currentChannel?.channelId || $currentRoomId) == roomId
            ) {
                $messages.push(newMessageData);
                $messages = $messages;

                setTimeout(() => {
                    chat.scrollTo({
                        top: 99999999,
                        behavior: 'smooth',
                    });
                }, 0);

                if (
                    newMessageData.profileData.profileId !=
                        $ourData.profileId &&
                    !document.hasFocus() &&
                    !$fronvoTitle.includes('(1)')
                ) {
                    setTitle(`(1) ${$fronvoTitle}`, true);
                }
            }
        }

        socket.on('newMessage', messageListener);
    }

    function attachDeletedMessageListener(): void {
        socket.on('messageDeleted', ({ messageId, roomId }) => {
            if (($currentChannel?.channelId || $currentRoomId) != roomId) {
                setTimeout(() => {
                    // Update cached room data
                    removeCachedMessage(roomId, messageId, $cachedRooms);
                }, 0);

                return;
            }

            for (const messageIndex in $messages) {
                const targetMessage = $messages[messageIndex];

                if (messageId == $replyingToId) {
                    $replyingTo = undefined;
                    $replyingToId = undefined;
                }

                if (targetMessage.message.messageId == messageId) {
                    $messages.splice(Number(messageIndex), 1);
                    $messages = $messages;

                    if ($messages.length == 0) {
                        previousEmpty = false;
                    }

                    break;
                }
            }
        });
    }

    function addDropListener(): void {
        chat.addEventListener('dragover', (e) => {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';

            chat.style.opacity = '0.5';
        });

        chat.addEventListener('dragend', () => {
            chat.style.opacity = '1';
        });

        chat.addEventListener('dragleave', () => {
            chat.style.opacity = '1';
        });

        chat.addEventListener('drop', (e) => {
            e.stopPropagation();
            e.preventDefault();

            chat.style.opacity = '1';

            if (e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0];

                if (file.size > ($ourData.isTurbo ? 3000000 : 1000000)) {
                    toast(`Image is above ${$ourData.isTurbo ? 3 : 1}MB.`);
                    return;
                }

                if (isAcceptedImage(file.type)) {
                    const reader = new FileReader();

                    reader.addEventListener('load', async () => {
                        sendImage(
                            $currentChannel?.channelId || $currentRoomId,
                            $sendingImage,
                            reader.result,
                            $ourData.isTurbo,
                            $lastSendsIn30,
                            $isInServer ? $currentServer.serverId : ''
                        );
                    });

                    reader.readAsDataURL(file);
                }
            }
        });
    }

    onMount(() => {
        addDropListener();

        chat.scrollTop = chat.scrollHeight;

        currentRoomId.subscribe((state) => {
            if (!state) return;

            canShowScroll = false;
            previousEmpty = false;
            isFirstLoad = true;
            hideMessages = true;

            if (!chat) return;

            chat.style.opacity = '0';
        });

        currentChannel.subscribe((state) => {
            if (!state) return;

            canShowScroll = false;
            previousEmpty = false;
            isFirstLoad = true;
            hideMessages = true;

            if (!chat) return;

            chat.style.opacity = '0';
        });

        pendingMessages.subscribe((state) => {
            if (!state) return;

            hideMessages = false;

            setTimeout(() => {
                if (!chat) return;

                chat.scrollTo({
                    top: 99999999,
                    behavior: 'smooth',
                });
            }, 0);
        });

        unsubscribe = currentRoomLoaded.subscribe(async (val) => {
            previousEmpty = false;

            if (!val) return;

            setTimeout(() => {
                if (!chat) return;

                chat.scrollTop = chat.scrollHeight;

                setTimeout(() => {
                    // Load images
                    chat.style.opacity = '1';
                }, 0);

                canShowScroll = true;
            }, 0);
        });

        attachNewMessageListener();
        attachDeletedMessageListener();
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

{#if $messages}
    <div
        bind:this={chat}
        class={`chat-container ${$isMobile ? 'mobile' : ''}`}
        transition:scale={{ duration: 1000, start: 0.975 }}
    >
        {#if $messages.length == 0 && !previousEmpty}
            <PropMessages />
        {/if}

        {#if $roomData || $currentChannel}
            {#if !previousEmpty && canShowScroll}
                <InfiniteLoading
                    distance={1500}
                    on:infinite={loadMore}
                    direction="top"
                >
                    <div slot="noMore" />
                    <div slot="noResults" />
                    <div slot="error" />
                    <div slot="spinner" />
                </InfiniteLoading>
            {/if}

            <span class="placeholder" />

            {#each $messages as { message, profileData }, i}
                <Message
                    {i}
                    {profileData}
                    messageData={message}
                    hideCondition={hideMessages}
                    isPending={$pendingMessages.includes(message.content) &&
                        i == $messages.length - 1}
                />
            {/each}
        {/if}
    </div>
{/if}

<style>
    .chat-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 100%;
        height: calc(100vh);
        padding-bottom: 20px;
        padding-top: 20px;
        overflow-y: scroll;
        overflow-x: hidden;
        transition: none;
        opacity: 0;
        z-index: 1;
    }

    .chat-container::-webkit-scrollbar {
        width: 8px;
    }

    .chat-container::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .chat-container:hover.chat-container::-webkit-scrollbar-thumb {
        background: var(--tertiary);
        width: 10px;
    }

    .placeholder {
        flex: 1;
    }

    .mobile {
        transform: translateY(-50px);
    }
</style>
