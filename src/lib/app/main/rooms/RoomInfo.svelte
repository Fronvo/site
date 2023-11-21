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
        setTitle,
        showModal,
    } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import { ModalTypes, targetProfileModal } from 'stores/modals';
    import { uploadImage } from 'utilities/rooms';

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

                    const newIcon = await uploadImage(
                        reader.result,
                        $ourData.isPRO
                    );

                    socket.emit('updateRoomData', {
                        roomId: $currentRoomId,
                        icon: newIcon,
                    });

                    isUpdating = false;
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
                {#if $roomData.isDM}
                    {#if $roomData.icon}
                        <img
                            id="icon"
                            bind:this={icon}
                            on:click={changeImage}
                            on:keydown={changeImage}
                            src={$roomData.icon}
                            draggable={false}
                            alt="Avatar"
                        />
                    {:else}
                        <img
                            id="icon"
                            bind:this={icon}
                            on:click={changeImage}
                            on:keydown={changeImage}
                            src="/images/avatar.svg"
                            draggable={false}
                            alt="Avatar"
                        />
                    {/if}
                {:else}
                    <svg
                        bind:this={icon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        ><path
                            fill="none"
                            stroke="var(--gray)"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M10 3L5 21M19 3l-5 18m8-12H4m16 7H2"
                        /></svg
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
        width: 100%;
        min-width: 100%;
        height: calc((45px + 45px + 10px + 3px) * 0.5);
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        padding: 10px;
        background: var(--primary);
        user-select: none;
        flex: 1;
    }

    .empty {
        border: none;
    }

    .data-container {
        display: flex;
        align-items: center;
        border-radius: 10px;
        width: max-content;
        height: 100%;
    }

    .placeholder {
        width: 100%;
        min-width: 100%;
        flex: 1;
        z-index: 1;
    }

    #icon {
        width: 36px;
        height: 36px;
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

    input {
        margin: 0;
        font-size: 1.3rem;
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
        cursor: default;
        fill: var(--gray);
        stroke: var(--gray);
    }
</style>
