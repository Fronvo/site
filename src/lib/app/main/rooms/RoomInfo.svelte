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
    import SearchBarChannel from '$lib/app/reusables/all/SearchBarChannel.svelte';

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

                <div class="spacer" />

                <svg
                    id="action"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    ><path
                        d="M19.183 7.805L16.22 4.838c-2.027-2.03-3.04-3.043-4.129-2.803c-1.088.24-1.581 1.587-2.568 4.28l-.668 1.823c-.263.718-.395 1.077-.632 1.355a2.035 2.035 0 0 1-.36.332c-.296.213-.664.314-1.4.517c-1.66.458-2.491.687-2.804 1.23a1.528 1.528 0 0 0-.204.773c.004.627.613 1.236 1.83 2.455L6.7 16.216l-4.476 4.48a.764.764 0 0 0 1.08 1.08l4.475-4.48l1.466 1.468c1.226 1.226 1.839 1.84 2.47 1.84c.265 0 .526-.068.757-.2c.548-.313.778-1.149 1.239-2.822c.202-.735.303-1.102.515-1.399c.093-.129.201-.247.322-.352c.275-.238.632-.372 1.345-.64l1.844-.693c2.664-1 3.996-1.501 4.23-2.586c.235-1.086-.77-2.093-2.783-4.107Z"
                    /></svg
                >

                <SearchBarChannel />
            </div>
        </div>
    {/if}
</div>

<style>
    .info-container {
        width: 100%;
        min-width: 100%;
        height: 53px;
        display: flex;
        padding: 15px;
        padding-right: 10px;
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
        width: 100%;
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

    .spacer {
        width: 100%;
        flex: 1;
    }

    svg {
        width: 28px;
        height: 28px;
        padding: 2px;
        cursor: default;
        fill: var(--gray);
        stroke: var(--gray);
    }

    #action {
        fill: var(--gray);
        cursor: pointer;
        margin-right: 10px;
    }

    #action:hover {
        fill: white;
    }
</style>
