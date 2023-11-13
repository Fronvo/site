<script lang="ts">
    import { fetchConvos, loadRoomsData, sendImage } from 'utilities/rooms';
    import {
        sendContent,
        replyingTo,
        replyingToId,
        showScrollBottom,
        currentRoomId,
        currentRoomData as roomData,
        currentRoomMessages as messages,
        currentRoomMessages,
        currentRoomLoaded,
        roomsList,
        currentRoomData,
        sendingImage,
    } from 'stores/rooms';
    import { onDestroy, onMount } from 'svelte';
    import {
        dismissModal,
        findCachedAccount,
        isAcceptedImage,
        setTitle,
        showModal,
    } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import {
        ModalTypes,
        targetMessageModal,
        targetMessageModalProfile,
    } from 'stores/modals';
    import type { RoomMessage, FronvoAccount } from 'interfaces/all';
    import Message from '$lib/app/reusables/rooms/Message.svelte';
    import {
        cachedAccountData,
        fronvoTitle,
        lastSendsIn30,
        socket,
    } from 'stores/main';
    import InfiniteLoading from 'svelte-infinite-loading';
    import type { Unsubscriber } from 'svelte/store';
    import type { NewRoomMessageResult } from 'interfaces/account/newRoomMessage';
    import RoomChatStart from '$lib/app/reusables/rooms/RoomChatStart.svelte';
    import { toast } from 'svelte-sonner';

    let chat: HTMLDivElement;
    let unsubscribe: Unsubscriber;
    let canShowScroll = false;
    let previousEmpty = false;

    async function loadMore({ detail: { loaded } }): Promise<void> {
        if (previousEmpty) {
            loaded();
            return;
        }

        socket.emit(
            'fetchRoomMessages',
            {
                roomId: $currentRoomId,
                from: $messages.length.toString(),
                to: ($messages.length + 50).toString(),
            },
            ({ roomMessages }) => {
                if (roomMessages.length == 0) {
                    previousEmpty = true;

                    loaded();
                } else {
                    $messages = roomMessages.concat($messages);

                    loaded();
                }
            }
        );
    }

    function deleteMessage(
        message: RoomMessage,
        profileData: FronvoAccount
    ): void {
        $targetMessageModal = message;
        $targetMessageModalProfile = profileData;

        showModal(ModalTypes.DeleteMessage);
    }

    function replyMessage(
        message: RoomMessage,
        profileData: FronvoAccount
    ): void {
        $replyingTo = profileData.username;
        $replyingToId = message.messageId;
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

            setTitle($fronvoTitle.replace('(1) ', ''));
        };

        function messageListener({
            roomId,
            newMessageData,
        }: NewRoomMessageResult): void {
            if ($messages.includes(newMessageData)) return;

            if ($currentRoomId == roomId) {
                setTimeout(() => {
                    if (!$showScrollBottom) {
                        chat.scrollTo({
                            behavior: 'smooth',
                            top: chat.scrollHeight,
                        });
                    } else {
                        chat.scrollTop = chat.scrollHeight;
                    }
                }, 0);

                $messages.push(newMessageData);
                $messages = $messages;
            }

            if (
                newMessageData.profileData.profileId != $ourData.profileId &&
                !document.hasFocus() &&
                !$fronvoTitle.includes('(1)')
            ) {
                setTitle(`(1) ${$fronvoTitle}`);
            }
        }

        socket.off('newRoomMessage', messageListener);

        socket.on('newRoomMessage', messageListener);
    }

    function attachDeletedMessageListener(): void {
        socket.on('roomMessageDeleted', ({ messageId, roomId }) => {
            if (roomId != $currentRoomId) return;

            for (const messageIndex in $messages) {
                const targetMessage = $messages[messageIndex];

                if (messageId == $replyingToId) {
                    $replyingTo = undefined;
                    $replyingToId = undefined;
                }

                if (targetMessage.message.messageId == messageId) {
                    $messages.splice(Number(messageIndex), 1);
                    $messages = $messages;

                    $roomData.totalMessages -= 1;

                    // DeleteMessageModal
                    if (
                        $targetMessageModal?.messageId ==
                        targetMessage.message.messageId
                    ) {
                        dismissModal();
                    }

                    break;
                }
            }
        });
    }

    function attachRoomDeletedListener(): void {
        socket.off('roomDeleted');

        if (!($ourData.profileId == $roomData?.ownerId)) {
            socket.on('roomDeleted', async ({ roomId }) => {
                if (roomId != $currentRoomId) {
                    $roomsList = await fetchConvos();
                } else {
                    $currentRoomLoaded = false;
                    $currentRoomId = undefined;
                    $currentRoomData = undefined;
                    $currentRoomMessages = [];

                    setTitle('Fronvo');

                    await loadRoomsData();
                }
            });
        }
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

                if (file.size > ($ourData.isPRO ? 3000000 : 1000000)) {
                    toast(`Image is above ${$ourData.isPRO ? 3 : 1}MB.`);
                    return;
                }

                if (isAcceptedImage(file.type)) {
                    const reader = new FileReader();

                    reader.addEventListener('load', async () => {
                        sendImage(
                            $currentRoomId,
                            $sendingImage,
                            reader.result,
                            $ourData.isPRO,
                            $lastSendsIn30
                        );
                    });

                    reader.readAsDataURL(file);
                }
            }
        });
    }

    function scrollListener(): void {
        if (chat.scrollHeight - chat.scrollTop > 1750 && canShowScroll) {
            $showScrollBottom = true;
        } else {
            $showScrollBottom = false;
        }
    }

    onMount(() => {
        chat.addEventListener('scroll', scrollListener);
        addDropListener();

        chat.scrollTop = chat.scrollHeight;

        currentRoomId.subscribe((state) => {
            if (!state) return;

            canShowScroll = false;
            previousEmpty = false;

            if (!chat) return;

            chat.style.opacity = '0';
        });

        unsubscribe = currentRoomLoaded.subscribe(async (val) => {
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

            if ($roomData.isDM) {
                setTitle(
                    (
                        await findCachedAccount(
                            $roomData.dmUsers[0] == $ourData.profileId
                                ? $roomData.dmUsers[1]
                                : $roomData.dmUsers[0],
                            $cachedAccountData
                        )
                    )?.username || 'Deleted user'
                );
            } else {
                setTitle($roomData.name);
            }

            // Put here, check conditions each new room
            // Reload listeners and messages
            attachNewMessageListener();
            attachDeletedMessageListener();
            attachRoomDeletedListener();
        });
    });

    onDestroy(() => {
        chat.removeEventListener('scroll', scrollListener);

        unsubscribe();
    });
</script>

{#if $messages}
    <div bind:this={chat} class="chat-container">
        {#if $roomData}
            <RoomChatStart />

            {#if $messages.length != 0 && $messages.length < 20}
                <div class="placeholder">
                    <h1 id="name">placeholder</h1>
                </div>
                <div class="placeholder">
                    <h1 id="name">placeholder</h1>
                </div>
                <div class="placeholder">
                    <h1 id="name">placeholder</h1>
                </div>
                <div class="placeholder">
                    <h1 id="name">placeholder</h1>
                </div>
                <div class="placeholder">
                    <h1 id="name">placeholder</h1>
                </div>
                <div class="placeholder">
                    <h1 id="name">placeholder</h1>
                </div>
                <div class="placeholder">
                    <h1 id="name">placeholder</h1>
                </div>
                <div class="placeholder">
                    <h1 id="name">placeholder</h1>
                </div>
            {/if}

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

            {#each $messages as { message, profileData }, i}
                <Message
                    {i}
                    {profileData}
                    messageData={message}
                    deleteCondition={$roomData?.ownerId ==
                        $ourData?.profileId ||
                        message.ownerId == $ourData?.profileId}
                    deleteCallback={() => deleteMessage(message, profileData)}
                    replyCallback={() => replyMessage(message, profileData)}
                />
            {/each}
        {/if}
    </div>
{/if}

<style>
    .chat-container {
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-content: start;
        width: calc(100vw - 275px - 275px);
        min-width: 550px;
        padding-top: calc(65px);
        height: calc(100vh);
        padding-bottom: 10px;
        overflow-y: scroll;
        overflow-x: hidden;
        transition: none;
        opacity: 0;
    }

    .placeholder {
        visibility: hidden;
        display: flex;
        align-items: start;
        margin-left: 20px;
        height: 100vh;
        flex: 1;
    }

    @media screen and (max-width: 1250px) {
        .chat-container {
            width: calc(100vw - 275px - 275px + 200px);
            min-width: 600px;
        }
    }
</style>
