<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import Dm from './DM.svelte';
    import { currentRoomId, roomsList } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import type { Room as RoomType } from 'interfaces/all';
    import Room from './Room.svelte';
    import CreateRoomButton from './CreateRoomButton.svelte';
</script>

<div
    class="messages-container"
    in:fly={{ duration: 250 }}
    out:fade={{ duration: 50 }}
>
    <div class="list-container">
        <div class="friends-container">
            {#if $roomsList.length == 0}
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
            {:else}
                <div class="panel-container">
                    {#if $roomsList.length > 0}
                        {#each $roomsList as roomData}
                            {#if roomData.isDM}
                                <Dm dmData={roomData} />
                            {:else}
                                <Room {roomData} />
                            {/if}
                        {/each}

                        <CreateRoomButton />
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
        transform: translateY(65px);
    }

    .list-container {
        display: flex;
        flex-direction: column;
        overflow: auto;
        overflow-x: hidden;
    }

    .panel-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow-y: auto;
        height: calc(100vh - 65px);
        padding-top: 10px;
        padding-bottom: 10px;
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
    }
</style>
