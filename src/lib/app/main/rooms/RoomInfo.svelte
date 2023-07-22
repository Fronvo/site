<script lang="ts">
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomData as roomData,
    } from 'stores/rooms';
    import { writable, type Unsubscriber } from 'svelte/store';
    import { onDestroy, onMount } from 'svelte';
    import { cachedAccountData, socket } from 'stores/main';
    import { fade } from 'svelte/transition';
    import {
        findCachedAccount,
        isAcceptedImage,
        setProgressBar,
        setTitle,
        showModal,
    } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import { ModalTypes, targetProfileModal } from 'stores/modals';
    import { toast } from 'svelte-sonner';

    let nameP = writable($roomData?.name);

    let isUpdating = false;

    let input: HTMLInputElement;
    let icon: HTMLElement | SVGSVGElement;

    let unsubscribe: Unsubscriber;

    async function changeImage(): Promise<void> {
        if ($roomData.isDM) {
            if ($nameP == 'Deleted user') return;

            $targetProfileModal = await findCachedAccount(
                $roomData.dmUsers[0] != $ourData.profileId
                    ? $roomData.dmUsers[0]
                    : $roomData.dmUsers[1],
                $cachedAccountData
            );

            showModal(ModalTypes.Profile);
            return;
        }

        if (isUpdating) return;

        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = async (_) => {
            let file = Array.from(input.files)[0];

            // 2MB
            if (file.size > 2000000) return;

            if (isAcceptedImage(file.type)) {
                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    isUpdating = true;
                    setProgressBar(true);

                    let previousIcon = $currentRoomData.icon;

                    const newIcon = await (
                        await fetch('/api/upload', {
                            method: 'POST',
                            body: JSON.stringify({
                                file: reader.result,
                                isPRO: $ourData.isPRO,
                            }),
                        })
                    ).json();

                    socket.emit('updateRoomData', {
                        roomId: $currentRoomId,
                        icon: newIcon,
                    });

                    await fetch('/api/remove', {
                        method: 'POST',
                        body: JSON.stringify({
                            icon: previousIcon,
                        }),
                    });

                    isUpdating = false;
                    setProgressBar(false);

                    toast(`${$currentRoomData.name}'s image updated`);
                });

                reader.readAsDataURL(file);
            }
        };

        input.click();
    }

    function changeName(): void {
        if ($nameP.length == 0) {
            $nameP = $roomData.name;
        }

        if ($nameP == $roomData.name || isUpdating) {
            return;
        }

        isUpdating = true;

        input.blur();

        socket.emit(
            'updateRoomData',
            {
                roomId: $currentRoomId,
                name: $nameP,
            },
            ({ err }) => {
                if (err) {
                    $nameP = $roomData.name;
                } else {
                    $roomData.name = $nameP;

                    toast(`Room name updated to ${$nameP}`);
                }

                isUpdating = false;
            }
        );
    }

    onMount(() => {
        unsubscribe = currentRoomLoaded.subscribe(async (state) => {
            if (!state) return;

            if ($roomData.isDM) {
                $nameP = $roomData.dmUser.username || 'Deleted user';
                $roomData.icon = $roomData.dmUser.avatar;

                setTimeout(() => {
                    input.disabled = true;
                }, 0);
            } else {
                $nameP = $roomData.name;
            }

            setTimeout(() => {
                input.style.opacity = '1';
                icon.style.opacity = '1';

                input.onblur = () => {
                    changeName();
                };

                input.onkeyup = (ev) => {
                    if (ev.key == 'Enter') {
                        changeName();
                    }
                };

                if (!$roomData.isDM) {
                    input.disabled = false;
                }
            }, 0);
        });

        socket.on('roomDataUpdated', ({ roomId, name, icon }) => {
            if (roomId == $roomData.roomId) {
                $nameP = name;
                $roomData.name = name;
                $roomData.icon = icon;

                updateIconOpacity();

                setTitle(name);
            }
        });

        function updateIconOpacity(): void {
            setTimeout(() => {
                icon.style.opacity = '1';
            }, 0);
        }
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

<div class="placeholder">
    {#if $currentRoomData}
        <div class={`info-container ${!$currentRoomId ? 'empty' : ''}`}>
            <div class="data-container" in:fade={{ duration: 150 }}>
                {#if $roomData.icon}
                    <img
                        id="icon"
                        bind:this={icon}
                        src={`${$roomData?.icon}`}
                        alt={`${$roomData?.name}'s icon'`}
                        draggable={false}
                        on:click={changeImage}
                        on:keydown={changeImage}
                    />
                {:else if $roomData.isDM}
                    <svg
                        id="icon"
                        bind:this={icon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 256 256"
                        on:click={changeImage}
                        on:keydown={changeImage}
                        ><path
                            fill="var(--branding)"
                            d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z"
                        /></svg
                    >
                {:else}
                    <svg
                        id="icon"
                        bind:this={icon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        on:click={changeImage}
                        on:keydown={changeImage}
                        ><g fill="var(--branding)"
                            ><path
                                d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2c1.108 0 2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715c.519.948.519 2.092.519 4.38v1.522c0 3.9 0 5.851-1.172 7.063C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212C2 19.576 2 17.626 2 13.725v-1.521Z"
                                opacity=".5"
                            /><path
                                d="M11.25 18a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0v3Z"
                            /></g
                        ></svg
                    >
                {/if}

                <input
                    bind:this={input}
                    bind:value={$nameP}
                    placeholder="Room name"
                    maxlength={15}
                />
            </div>

            <div class="placeholder" />
        </div>
    {/if}
</div>

<style>
    .info-container {
        top: 0;
        display: flex;
        padding: 5px;
        padding-right: 0;
        z-index: 1;
        height: 65px;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
        flex: 1;
        background: var(--bg_trans);
        backdrop-filter: blur(5px);
    }

    .empty {
        border: none;
    }

    .data-container {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 10px;
        width: max-content;
    }

    .placeholder {
        flex: 1;
        z-index: 1;
    }

    #icon {
        width: 42px;
        height: 42px;
        border-radius: 30px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: 150ms;
        cursor: pointer;
        border: 2px solid transparent;
        opacity: 0;
    }

    #icon:hover {
        border: 2px solid var(--branding);
    }

    input {
        margin: 0;
        font-size: 1.3rem;
        margin-left: 5px;
        color: var(--text);
        width: 200px;
        border: 2px solid transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        background: transparent;
        opacity: 0;
    }

    input:hover {
        border: 2px solid var(--secondary);
    }

    input:focus {
        border: 2px solid var(--branding);
    }

    input:disabled {
        background: transparent;
        color: var(--text);
    }

    input:disabled:hover {
        border: 2px solid transparent;
    }

    svg {
        padding: 2px;
    }
</style>
