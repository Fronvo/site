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

    onMount(() => {
        unsubscribe = currentRoomLoaded.subscribe(async (state) => {
            if (!state) return;

            if ($roomData.isDM) {
                $nameP = $roomData.dmUser.username || 'Deleted user';
                $roomData.icon = $roomData.dmUser.avatar;
            } else {
                $nameP = $roomData.name;
            }
        });

        socket.on('roomDataUpdated', ({ roomId, name, icon }) => {
            if (roomId == $roomData.roomId) {
                $nameP = name;
                $roomData.name = name;
                $roomData.icon = icon;

                setTitle(`Fronvo | ${name}`);
            }
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

<div class="placeholder">
    {#if $currentRoomData}
        <div class={`info-container ${!$currentRoomId ? 'empty' : ''}`}>
            <div class="data-container">
                {#if $roomData.isDM}
                    {#if $roomData.icon}
                        <img
                            id="icon"
                            on:click={changeImage}
                            on:keydown={changeImage}
                            src={$roomData.icon}
                            draggable={false}
                            alt="Avatar"
                        />
                    {:else}
                        <img
                            id="icon"
                            on:click={changeImage}
                            on:keydown={changeImage}
                            src="/images/avatar.svg"
                            draggable={false}
                            alt="Avatar"
                        />
                    {/if}
                {:else}
                    <svg
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

                <h1>{$currentRoomData.name}</h1>
            </div>

            <div class="placeholder" />
        </div>
    {/if}
</div>

<style>
    .info-container {
        width: 100%;
        min-width: 100%;
        height: 53px;
        display: flex;
        flex-direction: column;
        padding: 15px;
        margin-top: 1px;
        user-select: none;
        border-bottom: 1px solid rgb(23, 23, 23);
        box-shadow: 0 0 10px rgb(25, 25, 25);
    }

    .empty {
        border: none;
    }

    .data-container {
        display: flex;
        align-items: center;
        width: max-content;
        height: 100%;
    }

    .placeholder {
        width: 100%;
        min-width: 100%;
        z-index: 1;
    }

    #icon {
        width: 32px;
        height: 32px;
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
    }

    h1 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        padding-left: 5px;
        color: white;
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
    }

    h1:disabled {
        background: transparent;
        color: var(--text);
    }

    svg {
        width: 28px;
        height: 28px;
        padding: 2px;
        cursor: default;
        fill: var(--gray);
        stroke: var(--gray);
    }
</style>
