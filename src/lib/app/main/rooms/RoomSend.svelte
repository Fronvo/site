<script lang="ts">
    import Add from '$lib/svgs/Add.svelte';
    import Cancel from '$lib/svgs/Cancel.svelte';
    import Send from '$lib/svgs/Send.svelte';
    import { ourData } from 'stores/profile';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        replyingTo,
        replyingToId,
        sendContent,
        sendingImage,
        showScrollBottom,
    } from 'stores/rooms';
    import { onDestroy, onMount } from 'svelte';
    import { writable, type Unsubscriber, type Writable } from 'svelte/store';
    import { sendImage, sendMessage } from 'utilities/rooms';
    import RoomScrollBottom from './RoomScrollBottom.svelte';
    import { cachedAccountData, socket } from 'stores/main';
    import {
        findCachedAccount,
        isAcceptedImage,
        showDropdown,
    } from 'utilities/main';
    import { fade } from 'svelte/transition';
    import Gif from '$lib/svgs/Gif.svelte';
    import { DropdownTypes } from 'stores/dropdowns';
    import { targetTenorCallback } from 'stores/modals';

    let content: HTMLTextAreaElement;
    let typingE: HTMLDivElement;
    let unsubscribe: Unsubscriber;
    let unsubscribe2: Unsubscriber;
    let unsubscribe3: Unsubscriber;
    let unsubscribe4: Unsubscriber;

    let canMessage: boolean;
    let cantMessageReason: string;

    let typingSent = false;
    let pasteInited = false;
    let typing: Writable<string[]> = writable([]);

    function adjustCanMessage(): void {
        if ($currentRoomData.isDM) {
            if (!$ourData.friends.includes($currentRoomData.dmUser.profileId)) {
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

            content.disabled = !canMessage;

            if (!canMessage) {
                content.placeholder = cantMessageReason;
            } else {
                content.placeholder = 'Send a message';
            }
        }, 0);
    }

    function cancelReply(): void {
        $replyingTo = undefined;
        $replyingToId = undefined;
    }

    function setupImagePasting(): void {
        if (pasteInited) return;

        pasteInited = true;

        setTimeout(() => {
            if (!content) return;

            content.addEventListener('paste', (ev) => {
                if (ev.clipboardData.files.length > 0) {
                    const file = ev.clipboardData.files[0];

                    // 3MB
                    if (file.size > 3000000) return;

                    if (isAcceptedImage(file.type)) {
                        const reader = new FileReader();

                        reader.addEventListener('load', async () => {
                            await sendImage(
                                $currentRoomId,
                                $sendingImage,
                                reader.result
                            );
                        });

                        reader.readAsDataURL(file);
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

            // 3MB
            if (file.size > 3000000) return;

            if (isAcceptedImage(file.type)) {
                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    await sendImage(
                        $currentRoomId,
                        $sendingImage,
                        reader.result
                    );
                });

                reader.readAsDataURL(file);
            }
        };

        input.click();
    }

    function showGifPicker(): void {
        $targetTenorCallback = (url: string) => {
            socket.emit('sendRoomMessage', {
                roomId: $currentRoomId,
                message: url,
            });
        };

        showDropdown(
            DropdownTypes.Gif,
            document.getElementById('gif'),
            'top',
            -425,
            -525
        );
    }

    onMount(() => {
        socket.on('friendAdded', ({}) => adjustCanMessage());
        socket.on('friendRemoved', ({}) => adjustCanMessage());

        unsubscribe = sendContent.subscribe((text) => {
            if (text.length == 0) {
                if (!typingSent) return;

                typingSent = false;

                socket.emit('finishTyping', {
                    roomId: $currentRoomId,
                });
            } else {
                if (typingSent) return;

                typingSent = true;

                socket.emit('startTyping', {
                    roomId: $currentRoomId,
                });
            }
        });

        unsubscribe2 = replyingTo.subscribe((val) => {
            if (!$currentRoomId) return;

            setTimeout(() => {
                if (!content) return;

                if (!val) {
                    content.placeholder = 'Send a message';
                } else {
                    if (val == $ourData.username) {
                        val = 'yourself';
                    }

                    content.placeholder = `Replying to ${val}`;
                }
            }, 0);
        });

        unsubscribe3 = currentRoomLoaded.subscribe((state) => {
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

            $typing = [];

            $replyingTo = undefined;
            $replyingToId = undefined;

            setTimeout(() => {
                content.onkeyup = (ev) => {
                    if (ev.key == 'Enter' && !ev.shiftKey) {
                        sendMessage(
                            $currentRoomId,
                            $sendContent,
                            $replyingTo,
                            $replyingToId
                        );

                        ev.preventDefault();
                    }
                };
            }, 0);
        });

        unsubscribe4 = sendingImage.subscribe(() => {
            if (!content) return;

            adjustCanMessage();
        });

        typing.subscribe((val) => {
            if (!val || !typingE) return;

            setTimeout(() => {
                if (val.length == 0) {
                    typingE.style.opacity = '0';
                } else {
                    typingE.style.opacity = '1';
                }
            }, 0);
        });

        socket.on('typingStarted', async ({ roomId, profileId }) => {
            if (roomId == $currentRoomId) {
                if (profileId == $ourData.profileId) return;

                $typing.push(
                    (await findCachedAccount(profileId, $cachedAccountData))
                        .username
                );
                $typing = $typing;
            }
        });

        socket.on('typingEnded', async ({ roomId, profileId }) => {
            if (roomId == $currentRoomId) {
                if (profileId == $ourData.profileId) return;

                const username = (
                    await findCachedAccount(profileId, $cachedAccountData)
                ).username;

                // Might have missed the start event
                if ($typing.includes(username)) {
                    $typing.splice($typing.indexOf(username), 1);
                    $typing = $typing;
                }
            }
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
    <div class="send-container" in:fade={{ duration: 150 }}>
        {#if $showScrollBottom}
            <RoomScrollBottom />
        {/if}

        <div class="wrapper">
            <Add callback={openInputForImage} />

            {#if $replyingTo}
                <Cancel callback={cancelReply} />
            {/if}

            <textarea
                bind:this={content}
                placeholder={`Send a message`}
                id="textarea-content"
                bind:value={$sendContent}
                maxlength={500}
                spellcheck="true"
                lang="en"
            />

            <Gif callback={showGifPicker} />

            {#if $sendContent.trim().length > 0}
                <Send
                    callback={() =>
                        sendMessage(
                            $currentRoomId,
                            $sendContent,
                            $replyingTo,
                            $replyingToId
                        )}
                />
            {/if}
        </div>

        <div bind:this={typingE} class="typing">
            <div class="wrapper-anim" style="--size:48px; --duration: 250ms;">
                <div class="dot dot-1" />
                <div class="dot dot-2" />
                <div class="dot dot-3" />
            </div>

            <h1>
                <span>
                    {$typing.toString()}
                </span>
                {#if $typing.length == 1}
                    is
                {:else}
                    are
                {/if} typing...
            </h1>
        </div>
    </div>
{/if}

<style>
    .send-container {
        position: sticky;
        bottom: 0px;
        background: transparent;
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        height: 65px;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 95%;
        padding: 5px;
        padding-bottom: 2.5px;
        padding-top: 2.5px;
        border-radius: 10px;
        background: var(--primary);
    }

    textarea {
        background: transparent;
        font-size: 1.05rem;
        height: 34px;
        flex: 1;
    }

    .typing {
        display: flex;
        text-align: start;
        font-size: 0.8rem;
        margin-top: 0;
        width: 95%;
        opacity: 0;
    }

    .typing h1 {
        font-size: 0.8rem;
        margin: 0;
    }

    .typing span {
        font-weight: 900;
    }

    .wrapper-anim {
        height: var(--size);
        width: var(--size);
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-16px) translateX(5px);
    }

    .dot {
        width: 5px;
        height: 5px;
        background-color: var(--branding);
        margin-right: 3px;
        display: inline-block;
        border-radius: 100%;
    }

    .dot-1 {
        animation: sync 1s ease-in-out infinite alternate-reverse;
    }

    .dot-2 {
        animation: sync 1s ease-in-out infinite alternate-reverse;
    }

    .dot-3 {
        animation: sync 1s ease-in-out infinite alternate-reverse;
    }

    @keyframes sync {
        0% {
            -webkit-transform: translateY(2.5px);
            transform: translateY(2.5px);
        }

        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    }
</style>
