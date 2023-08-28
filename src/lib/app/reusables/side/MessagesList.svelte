<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import Dm from './DM.svelte';
    import { currentRoomId, roomsList } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import type { Room as RoomType } from 'interfaces/all';
    import Room from './Room.svelte';
    import CreateRoomButton from './CreateRoomButton.svelte';

    let activePanel: 0 | 1 = 0;

    let dms: Writable<RoomType[]> = writable([]);
    let rooms: Writable<RoomType[]> = writable([]);

    let allElement: HTMLHeadingElement;
    let pendingElement: HTMLHeadingElement;
    let indicator: HTMLDivElement;
    let notificatorRooms: HTMLDivElement;
    let notificatorDMs: HTMLDivElement;

    let totalUnreadRooms = 0;
    let totalUnreadDMs = 0;

    function moveIndicator(): void {
        if (activePanel == 0) {
            indicator.style.marginLeft = `${allElement.clientWidth / 2 - 15}px`;
        } else {
            indicator.style.marginLeft = `${
                allElement.clientWidth + pendingElement.clientWidth / 2 - 4
            }px`;
        }

        setTimeout(() => {
            indicator.style.transition =
                'all 150ms cubic-bezier(0.3, 1, 0.5, 1)';
        }, 150);
    }

    function showAll(): void {
        activePanel = 0;

        setTimeout(() => {
            notificatorRooms.style.display = 'none';

            if (totalUnreadDMs > 0) {
                notificatorDMs.style.display = 'initial';
            }
        }, 0);

        moveIndicator();
    }

    function showPending(): void {
        activePanel = 1;

        setTimeout(() => {
            notificatorDMs.style.display = 'none';

            if (totalUnreadRooms > 0) {
                notificatorRooms.style.display = 'initial';
            }
        }, 0);

        moveIndicator();
    }

    function updateNotificators(): void {
        totalUnreadRooms = 0;
        totalUnreadDMs = 0;

        for (const roomIndex in $roomsList) {
            const target = $roomsList[roomIndex];

            if (target.unreadCount > 0) {
                if (target.isDM) totalUnreadDMs += 1;
                else totalUnreadRooms += 1;

                setTimeout(() => {
                    if (target.isDM) {
                        notificatorDMs.style.display = 'initial';
                    } else {
                        notificatorRooms.style.display = 'initial';
                    }
                }, 0);
            }
        }

        if (totalUnreadDMs == 0 && activePanel != 1) {
            setTimeout(() => {
                notificatorDMs.style.display = 'none';
            }, 0);
        }

        if (totalUnreadRooms == 0 && activePanel != 0) {
            setTimeout(() => {
                notificatorRooms.style.display = 'none';
            }, 0);
        }
    }

    onMount(() => {
        if (!indicator) return;

        indicator.style.transition = 'none';

        moveIndicator();

        roomsList.subscribe((state) => {
            if (!state) return;

            $dms = [];
            $rooms = [];

            for (const roomIndex in state) {
                const target = state[roomIndex];

                if (target.isDM) {
                    $dms.push(target);
                } else {
                    $rooms.push(target);
                }
            }

            $dms = $dms;
            $rooms = $rooms;

            updateNotificators();

            setTimeout(() => {
                notificatorRooms.style.display = 'none';
            }, 0);
        });

        currentRoomId.subscribe((state) => {
            if (!state) return;

            setTimeout(() => {
                updateNotificators();
            }, 1000);
        });
    });
</script>

<div
    class="messages-container"
    in:fly={{ duration: 250 }}
    out:fade={{ duration: 50 }}
>
    <div class="list-container">
        <div class="friends-container">
            <div class="wrapper">
                <h1
                    bind:this={allElement}
                    on:click={showAll}
                    on:keydown={showAll}
                >
                    Rooms

                    <div bind:this={notificatorRooms} class="notificator" />
                </h1>

                <div class="wrapper-v2">
                    <h1
                        bind:this={pendingElement}
                        on:click={showPending}
                        on:keydown={showPending}
                    >
                        DMs
                    </h1>

                    <div bind:this={notificatorDMs} class="notificator2" />
                </div>
            </div>

            <div bind:this={indicator} class="indicator" />

            {#if activePanel == 0}
                {#if $rooms.length == 0}
                    <div class="empty">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            ><g
                                fill="none"
                                stroke="var(--branding)"
                                stroke-width="1.5"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11 7L8 17m8-10l-3 10m5-7H7m10 4H6"
                                /><path
                                    d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
                                    opacity=".5"
                                /></g
                            ></svg
                        >
                        <h1>No rooms</h1>

                        <CreateRoomButton />
                    </div>
                {/if}

                <div class="panel-container">
                    {#if $rooms.length > 0}
                        {#each $rooms as roomData}
                            <Room {roomData} />
                        {/each}

                        <CreateRoomButton />
                    {/if}
                </div>
            {:else}
                {#if $dms.length == 0}
                    <div class="empty">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            ><g
                                fill="none"
                                stroke="var(--branding)"
                                stroke-width="1.5"
                                ><path
                                    stroke-linecap="round"
                                    d="M12 18a6 6 0 1 1 5.64-3.946a1.54 1.54 0 0 1-.413.599l-.08.074a1.637 1.637 0 0 1-2.747-1.203V12m0 0a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 0 1 4.8 0Z"
                                /><path
                                    d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
                                    opacity=".5"
                                /></g
                            ></svg
                        >
                        <h1>No messages</h1>
                    </div>
                {/if}

                <div class="panel-container">
                    {#if $dms.length > 0}
                        {#each $dms as dmData}
                            <Dm {dmData} />
                        {/each}
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .messages-container {
        border-right: 1px solid var(--primary);
        width: 275px;
        height: calc(100vh - 65px);
        transform: translateY(65px);
        box-shadow: 0 5px 4px var(--message_shadow);
    }

    .list-container {
        display: flex;
        flex-direction: column;
        overflow: auto;
        overflow-x: hidden;
    }

    .wrapper {
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 275px;
    }

    .wrapper h1 {
        cursor: pointer;
        margin: 0;
        font-size: 1.2rem;
        width: 40%;
        flex: 1;
        border-radius: 10px;
        padding: 5px;
        margin-left: 5px;
        margin-right: 5px;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .wrapper h1:hover {
        background: var(--primary);
    }

    .indicator {
        display: flex;
        width: 35px;
        height: 3px;
        border-radius: 30px;
        background: var(--branding);
        margin-bottom: 5px;
    }

    .panel-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow-y: auto;
        height: calc(100vh - 65px - 48px);
    }

    .wrapper-v2 {
        display: flex;
        flex: 1;
    }

    .notificator {
        position: absolute;
        transform: translateX(2px) translateY(2px);
        width: 8px;
        height: 8px;
        background: var(--branding);
        box-shadow: 0 0 5px var(--branding);
        border-radius: 20px;
        pointer-events: none;
    }

    .notificator2 {
        position: absolute;
        transform: translateX(82px) translateY(5px);
        width: 8px;
        height: 8px;
        background: var(--branding);
        box-shadow: 0 0 5px var(--branding);
        border-radius: 20px;
        pointer-events: none;
    }

    .empty {
        height: calc(100vh - 260px);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 275px;
        justify-content: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .empty h1 {
        margin: 0;
        font-size: 1.3rem;
        margin-bottom: 15px;
    }

    .empty svg {
        width: 128px;
        height: 128px;
        cursor: default;
    }

    @media screen and (max-width: 1250px) {
        .messages-container {
            width: 76px;
            margin-top: 48px;
        }

        .empty {
            display: none;
        }

        .wrapper {
            display: none;
        }

        .indicator {
            display: none;
        }
    }
</style>
