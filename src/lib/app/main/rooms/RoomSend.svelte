<script lang="ts">
    import { ourData } from 'stores/profile';
    import {
        currentChannel,
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        currentServer,
        isInServer,
        pendingMessages,
        replyingTo,
        replyingToId,
        sendContent,
        sendingImage,
    } from 'stores/rooms';
    import { onDestroy, onMount } from 'svelte';
    import { sendImage, sendMessage } from 'utilities/rooms';
    import {
        disabledIn30,
        lastSendAt,
        lastSendsIn30,
        socket,
    } from 'stores/main';
    import { isAcceptedImage } from 'utilities/main';
    import { slide } from 'svelte/transition';
    import { targetTenorCallback } from 'stores/modals';
    import { toast } from 'svelte-sonner';
    import { sineInOut } from 'svelte/easing';
    import type { Unsubscriber } from 'svelte/motion';

    let content: HTMLTextAreaElement;
    let unsubscribe: Unsubscriber;
    let unsubscribe2: Unsubscriber;
    let unsubscribe3: Unsubscriber;
    let unsubscribe4: Unsubscriber;

    let canMessage: boolean;
    let cantMessageReason: string;

    function adjustCanMessage(): void {
        if (!$isInServer) {
            if (!$currentRoomData.dmUser.username) {
                canMessage = false;
                cantMessageReason = 'This user has been deleted';
            } else if (
                !$ourData.friends.includes($currentRoomData.dmUser.profileId)
            ) {
                canMessage = false;
                cantMessageReason = "This user isn't your friend anymore";
            } else {
                canMessage = true;
            }
        } else {
            canMessage = true;
        }

        if (canMessage) {
            if ($sendingImage) {
                canMessage = false;
                cantMessageReason = 'Sending image...';
            } else {
                canMessage = true;
            }
        }

        if ($disabledIn30) {
            canMessage = false;
            cantMessageReason = 'Too many messages in a short period of time.';
        }

        setTimeout(() => {
            if (!content) return;

            if (!canMessage) {
                content.placeholder = cantMessageReason;

                if (!$sendingImage) {
                    setTimeout(() => {
                        content.disabled = true;
                    }, 0);
                }
            } else {
                content.placeholder = `Message ${
                    !$isInServer
                        ? '@' + $currentRoomData.dmUser.username
                        : '#' + $currentChannel.name
                }`;

                content.disabled = false;
            }
        }, 0);
    }

    function cancelReply(): void {
        $replyingTo = undefined;
        $replyingToId = undefined;
    }

    function sendMsg(): void {
        sendMessage(
            $currentChannel?.channelId || $currentRoomId,
            $sendContent,
            $replyingTo,
            $replyingToId,
            $lastSendAt,
            $lastSendsIn30,
            $currentRoomMessages,
            $pendingMessages,
            $ourData,
            $isInServer ? $currentServer.serverId : ''
        );
    }

    function setupImagePasting(): void {
        setTimeout(() => {
            if (!content) return;

            content.addEventListener('paste', (ev) => {
                if (ev.clipboardData.files.length > 0) {
                    const file = ev.clipboardData.files[0];

                    if (file.size > ($ourData.isTurbo ? 3000000 : 1000000)) {
                        toast(`Image is above ${$ourData.isTurbo ? 3 : 1}MB.`);
                        return;
                    }

                    if (isAcceptedImage(file.type)) {
                        const reader = new FileReader();

                        reader.addEventListener('load', async () => {
                            await sendImage(
                                $currentChannel?.channelId || $currentRoomId,
                                $sendingImage,
                                reader.result,
                                $ourData.isTurbo,
                                $lastSendsIn30,
                                $isInServer ? $currentServer.serverId : ''
                            );
                        });

                        reader.readAsDataURL(file);
                    } else {
                        toast('Unsupported file type.');
                    }
                }
            });
        }, 0);
    }

    function openInputForImage(): void {
        if (!canMessage) return;

        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = async (_) => {
            let file = Array.from(input.files)[0];

            if (file.size > ($ourData.isTurbo ? 3000000 : 1000000)) {
                toast(`Image is above ${$ourData.isTurbo ? 3 : 1}MB.`);
                return;
            }

            if (isAcceptedImage(file.type)) {
                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    await sendImage(
                        $currentChannel?.channelId || $currentRoomId,
                        $sendingImage,
                        reader.result,
                        $ourData.isTurbo,
                        $lastSendsIn30,
                        $isInServer ? $currentServer.serverId : ''
                    );
                });

                reader.readAsDataURL(file);
            } else {
                toast('Unsupported file type.');
            }
        };

        input.click();
    }

    function showGifPicker(): void {
        if (!canMessage) return;

        $targetTenorCallback = (url: string) => {
            if (!$isInServer) {
                socket.emit('sendMessage', {
                    roomId: $currentRoomId,
                    message: url,
                });
            } else {
                socket.emit('sendChannelMessage', {
                    serverId: $currentServer.serverId,
                    channelId: $currentChannel.channelId,
                    message: url,
                });
            }
        };

        // showDropdown(
        //     DropdownTypes.Gif,
        //     document.getElementById('gif'),
        //     'top',
        //     -425,
        //     -525
        // );
    }

    onMount(() => {
        socket.on('friendAdded', ({}) => adjustCanMessage());
        socket.on('friendRemoved', ({}) => adjustCanMessage());

        unsubscribe = replyingTo.subscribe((val) => {
            if (!$currentRoomId) return;

            setTimeout(() => {
                if (!content) return;

                if (!val) {
                    content.placeholder = `Message ${
                        !$isInServer
                            ? '@' + $currentRoomData.dmUser.username
                            : '#' + $currentChannel.name
                    }`;
                } else {
                    if (val == $ourData.username) {
                        val = 'yourself';
                    }

                    content.placeholder = `Replying to ${val}`;
                }
            }, 0);
        });

        unsubscribe2 = currentRoomLoaded.subscribe((state) => {
            if (!state) return;

            adjustCanMessage();
            setupImagePasting();

            document.addEventListener('keydown', (ev) => {
                // Default to room chat input if no other input is focused
                if (
                    document.activeElement.tagName
                        .toLowerCase()
                        .includes('input') ||
                    (document.activeElement.tagName
                        .toLowerCase()
                        .includes('textarea') &&
                        document.activeElement.id != 'textarea-content')
                )
                    return;

                if (ev.key == 'Enter' && !ev.shiftKey) {
                    ev.preventDefault();
                } else {
                    if (
                        ev.ctrlKey ||
                        ev.key == 'ArrowUp' ||
                        ev.key == 'ArrowDown' ||
                        ev.key == 'PageUp' ||
                        ev.key == 'PageDown'
                    )
                        return;

                    content && content.focus();
                }
            });

            $replyingTo = undefined;
            $replyingToId = undefined;

            setTimeout(() => {
                content.onkeyup = (ev) => {
                    if (ev.key == 'Enter' && !ev.shiftKey) {
                        sendMsg();

                        ev.preventDefault();

                        adjustCanMessage();
                    }
                };
            }, 0);
        });

        unsubscribe3 = sendingImage.subscribe(() => {
            if (!content) return;

            adjustCanMessage();
        });

        unsubscribe4 = disabledIn30.subscribe(() => {
            setTimeout(() => {
                content && adjustCanMessage();
            }, 0);
        });
    });

    onDestroy(() => {
        unsubscribe();
        unsubscribe2();
        unsubscribe3();
        unsubscribe4();
    });
</script>

{#if $currentRoomLoaded}
    <div class="send-container">
        <div class="wrapper">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                on:click={openInputForImage}
                on:keydown={openInputForImage}
                fill="currentColor"
                ><g
                    ><path
                        d="m19.352 7.617l-3.96-3.563c-1.127-1.015-1.69-1.523-2.383-1.788L13 5c0 2.357 0 3.536.732 4.268C14.464 10 15.643 10 18 10h3.58c-.362-.704-1.012-1.288-2.228-2.383Z"
                    /><path
                        fill-rule="evenodd"
                        d="M10 22h4c3.771 0 5.657 0 6.828-1.172C22 19.657 22 17.771 22 14v-.437c0-.873 0-1.529-.043-2.063h-4.052c-1.097 0-2.067 0-2.848-.105c-.847-.114-1.694-.375-2.385-1.066c-.692-.692-.953-1.539-1.067-2.386c-.105-.781-.105-1.75-.105-2.848l.01-2.834c0-.083.007-.164.02-.244C11.121 2 10.636 2 10.03 2C6.239 2 4.343 2 3.172 3.172C2 4.343 2 6.229 2 10v4c0 3.771 0 5.657 1.172 6.828C4.343 22 6.229 22 10 22Zm-.987-9.047a.75.75 0 0 0-1.026 0l-2 1.875a.75.75 0 0 0 1.026 1.094l.737-.69V18.5a.75.75 0 0 0 1.5 0v-3.269l.737.691a.75.75 0 0 0 1.026-1.094l-2-1.875Z"
                        clip-rule="evenodd"
                    /></g
                ></svg
            >
            {#if $replyingTo}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    on:click={cancelReply}
                    on:keydown={cancelReply}
                    fill="currentColor"
                    ><path
                        fill-rule="evenodd"
                        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"
                    /></svg
                >
            {/if}

            <textarea
                bind:this={content}
                placeholder={`Message ${
                    !$isInServer
                        ? '@' + $currentRoomData?.dmUser.username
                        : '#' + $currentChannel?.name
                }`}
                id="textarea-content"
                bind:value={$sendContent}
                maxlength={500}
                spellcheck="true"
                lang="en"
            />

            <!-- Reenable once we fix UI -->
            <!-- 
            <svg
                id="gif"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                on:click={showGifPicker}
                on:keydown={showGifPicker}
                fill="currentColor"
                ><g
                    ><path
                        d="M11.25 2c-4.219.004-6.401.08-7.786 1.464C2.08 4.85 2.004 7.031 2 11.25h4.914a3.987 3.987 0 0 1-.757-1.528C5.62 7.57 7.57 5.62 9.722 6.157c.572.143 1.09.406 1.528.757V2ZM2 12.75c.004 4.218.08 6.4 1.464 7.785C4.85 21.92 7.031 21.995 11.25 22v-7.877A4.75 4.75 0 0 1 7 16.75a.75.75 0 0 1 0-1.5a3.251 3.251 0 0 0 3.163-2.5H2ZM12.75 22c4.218-.005 6.4-.08 7.785-1.465c1.385-1.384 1.46-3.567 1.465-7.785h-8.163A3.251 3.251 0 0 0 17 15.25a.75.75 0 0 1 0 1.5a4.75 4.75 0 0 1-4.25-2.627V22ZM22 11.25c-.005-4.219-.08-6.401-1.465-7.786C19.151 2.08 16.968 2.004 12.75 2v4.914a3.988 3.988 0 0 1 1.527-.757c2.153-.538 4.104 1.412 3.565 3.565a3.987 3.987 0 0 1-.756 1.528H22Z"
                    /><path
                        d="M9.358 7.613a2.497 2.497 0 0 1 1.892 2.422v1.215h-1.215a2.497 2.497 0 0 1-2.422-1.892a1.44 1.44 0 0 1 1.745-1.745Zm3.392 2.422v1.215h1.215c1.145 0 2.144-.78 2.422-1.892a1.44 1.44 0 0 0-1.746-1.745a2.497 2.497 0 0 0-1.891 2.422Z"
                    /></g
                ></svg
            > -->

            {#if $sendContent.trim().length > 0}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    on:click={sendMsg}
                    on:keydown={sendMsg}
                    transition:slide={{
                        axis: 'x',
                        duration: 250,
                        easing: sineInOut,
                    }}
                    fill="currentColor"
                    ><g
                        ><path
                            d="M14.143 15.962a.5.5 0 0 1-.244.68l-9.402 4.193c-1.495.667-3.047-.814-2.306-2.202l3.152-5.904c.245-.459.245-1 0-1.458L2.191 5.367c-.74-1.388.81-2.87 2.306-2.202l3.525 1.572a2 2 0 0 1 .974.932l5.147 10.293Z"
                        /><path
                            d="M15.533 15.39a.5.5 0 0 0 .651.233l4.823-2.15c1.323-.59 1.323-2.355 0-2.945L12.109 6.56a.5.5 0 0 0-.651.68l4.075 8.15Z"
                        /></g
                    ></svg
                >
            {/if}
        </div>
    </div>
{/if}

<style>
    .send-container {
        position: sticky;
        background: transparent;
        display: flex;
        flex-direction: column;
        width: 97.5%;
        max-width: 100%;
        align-items: center;
        justify-content: end;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        height: 42px;
        margin: 10px;
        margin-top: 0;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 7px;
        background: var(--primary);
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 64px;
    }

    textarea {
        background: transparent;
        font-size: 1rem;
        margin-top: 2px;
        height: 34px;
        flex: 1;
        font-weight: 500;
        color: white;
    }

    textarea:disabled {
        background: transparent;
    }

    svg {
        width: 34px;
        height: 34px;
        padding: 5px;
        margin-right: 5px;
        border-radius: 15px;
        fill: var(--gray);
    }

    svg:hover {
        fill: var(--text);
    }
</style>
