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

    let unsubscribe: Unsubscriber;

    async function enterRoom(): Promise<void> {
        if ($currentRoomId == roomData.roomId) return;

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

{#if roomData.icon}
    <img
        class={`${$currentRoomId == roomData.roomId ? 'active' : ''}`}
        on:click={enterRoom}
        on:keydown={enterRoom}
        id="avatar"
        src={roomData.icon}
        alt={`${roomData.name}\'s avatar'`}
    />
{:else}
    <span
        class={`placeholder ${
            $currentRoomId == roomData.roomId ? 'active' : ''
        }`}
        on:click={enterRoom}
        on:keydown={enterRoom}
        id="avatar"
    >
        <h1>{roomData.name[0] + roomData.name[1]}</h1></span
    >
{/if}

<style>
    #avatar {
        width: 48px;
        height: 48px;
        cursor: pointer;
        margin: 0;
        padding: 0;
        transition: 125ms;
        margin-bottom: 10px;
        user-select: none;
    }

    img {
        border-radius: 20px;
    }

    #avatar:hover {
        border-radius: 15px;
    }

    #avatar:active {
        transform: translateY(2px);
    }

    .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--primary);
        border-radius: 20px;
    }

    .placeholder:hover,
    .active {
        background: var(--branding);
    }

    .placeholder h1 {
        font-size: 1.1rem;
        font-weight: 600;
    }

    .active {
        border-radius: 15px;
        background: var(--branding);
    }
</style>
