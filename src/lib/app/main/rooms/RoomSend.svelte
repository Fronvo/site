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
    import { isMobile, socket } from 'stores/main';
    import { isAcceptedImage, showDropdown, showModal } from 'utilities/main';
    import { slide } from 'svelte/transition';
    import {
        ModalTypes,
        sendImageTargetFile,
        targetImageModal,
        targetTenorCallback,
    } from 'stores/modals';
    import { toast } from 'svelte-sonner';
    import { sineInOut } from 'svelte/easing';
    import type { Unsubscriber } from 'svelte/motion';
    import { DropdownTypes } from 'stores/dropdowns';

    let content: HTMLTextAreaElement;
    let unsubscribe: Unsubscriber;
    let unsubscribe2: Unsubscriber;
    let unsubscribe3: Unsubscriber;

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
                            $targetImageModal = reader.result.toString();
                            $sendImageTargetFile = file;

                            showModal(ModalTypes.SendImage);
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
                    $targetImageModal = reader.result.toString();
                    $sendImageTargetFile = file;

                    showModal(ModalTypes.SendImage);
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
                    serverId: $currentServer?.serverId,
                    channelId: $currentChannel?.channelId,
                    message: url,
                });
            }
        };

        showModal(ModalTypes.Gif);
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
    });

    onDestroy(() => {
        unsubscribe();
        unsubscribe2();
        unsubscribe3();
    });
</script>

{#if $currentRoomLoaded}
    <div class={`send-container ${$isMobile ? 'mobile' : ''}`}>
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
            <svg
                id="gif"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 16 16"
                fill="currentColor"
                on:click={showGifPicker}
                on:keydown={showGifPicker}
                ><path
                    d="M1 4.5A2.5 2.5 0 0 1 3.5 2h9A2.5 2.5 0 0 1 15 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 11.5zm4.052 2.206c.481-.05.853.036.986.103a.5.5 0 1 0 .447-.894c-.351-.176-.928-.267-1.537-.203c-.96.1-1.948.934-1.948 2.297c0 1.385 1.054 2.3 2.3 2.3c.58 0 1.1-.273 1.397-.553c.262-.248.303-.578.303-.783v-.964a.5.5 0 0 0-.5-.5h-.807a.5.5 0 0 0 0 1H6v.463a.426.426 0 0 1-.006.072a1.126 1.126 0 0 1-.694.264c-.731 0-1.3-.504-1.3-1.3c0-.817.567-1.251 1.052-1.302M9 6.21a.5.5 0 0 0-1 0v3.6a.5.5 0 0 0 1 0zm1.5-.5a.5.5 0 0 0-.5.5v3.6a.5.5 0 0 0 1 0V8.505l1.003-.006a.5.5 0 0 0-.006-1L11 7.506v-.797h1.5a.5.5 0 0 0 0-1z"
                /></svg
            >

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

    .mobile {
        transform: translateY(-50px);
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
        color: var(--text);
    }

    .mobile textarea {
        font-size: 0.9rem;
    }

    textarea::placeholder {
        color: var(--gray);
        opacity: 0.5;
        transform: translateY(-1px);
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

    @media screen and (max-width: 850px) {
        .mobile textarea {
            font-size: 0.8rem;
            transform: translateY(2px);
        }

        .mobile svg {
            width: 32px;
            height: 32px;
        }
    }
</style>
