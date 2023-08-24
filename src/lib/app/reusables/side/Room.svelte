<script lang="ts">
    import type { Room } from 'interfaces/all';
    import { socket } from 'stores/main';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
    } from 'stores/rooms';
    import { onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { onDestroy } from 'svelte';
    import { loadRoomMessages } from 'utilities/rooms';
    import { ourData } from 'stores/profile';

    export let roomData: Room;

    let nameElement: HTMLHeadingElement;

    let unsubscribe: Unsubscriber;

    async function enterRoom(): Promise<void> {
        if ($currentRoomId == roomData.roomId) return;

        nameElement.style.fontWeight = '300';

        $currentRoomId = roomData.roomId;
        $currentRoomMessages = await loadRoomMessages(roomData.roomId);
        $currentRoomData = roomData;

        $currentRoomLoaded = false;
        $currentRoomLoaded = true;

        roomData.unreadCount = 0;
    }

    onMount(() => {
        socket.on('roomDataUpdated', ({ roomId, name, icon }) => {
            if (roomData.roomId == roomId) {
                roomData.name = name;
                roomData.icon = icon;
            }
        });

        socket.on('newRoomMessage', ({ roomId, newMessageData }) => {
            if (roomId == roomData.roomId) {
                if (
                    newMessageData.profileData.profileId != $ourData.profileId
                ) {
                    roomData.unreadCount += 1;
                }

                roomData = roomData;
            }
        });

        unsubscribe = currentRoomLoaded.subscribe((state) => {
            if (!state) return;

            if ($currentRoomId == roomData.roomId) {
                roomData.unreadCount = 0;
            }
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    $: {
        roomData.unreadCount =
            $currentRoomId != roomData.roomId ? roomData.unreadCount : 0;
    }
</script>

<div
    class={`room-container ${
        $currentRoomId == roomData.roomId ? 'active' : ''
    }`}
    on:click={enterRoom}
    on:keydown={enterRoom}
>
    {#if roomData.icon}
        <img
            id="avatar"
            src={roomData.icon}
            alt={`${roomData.name}\'s avatar'`}
        />
    {:else}
        <svg
            id="avatar"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
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

    <div class="info-container">
        <h1 bind:this={nameElement} id="name">{roomData.name}</h1>
    </div>

    {#if roomData.unreadCount > 0 && $currentRoomId != roomData.roomId}
        <h1 id="unread">{roomData.unreadCount}</h1>
    {/if}
</div>

<style>
    .room-container {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px 5px 10px 10px;
        transition: 75ms;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .room-container:hover {
        background: var(--primary);
    }

    .active {
        background: var(--primary);
    }

    .active:hover {
        background: var(--secondary);
    }

    .info-container {
        margin-left: 10px;
        flex: 1;
    }

    #name {
        font-size: 1rem;
        margin: 0;
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        letter-spacing: 0.1px;
        font-weight: 500;
    }

    .mark {
        font-weight: 900;
    }

    #avatar {
        width: 44px;
        height: 44px;
        border-radius: 30px;
    }

    #unread {
        display: flex;
        font-size: 0.9rem;
        margin: 0;
        background: rgb(255, 33, 33);
        box-shadow: 0 0 3px red;
        border-radius: 5px;
        padding: 5px;
        color: white;
        font-weight: 900;
    }

    @media screen and (max-width: 1250px) {
        .room-container {
            width: max-content;
            justify-content: center;
        }

        .info-container {
            display: none;
        }

        #unread {
            display: none;
        }
    }
</style>
