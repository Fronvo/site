<script lang="ts">
    import type { Room } from 'interfaces/all';
    import { socket } from 'stores/main';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        isInServer,
    } from 'stores/rooms';
    import { onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { onDestroy } from 'svelte';
    import { goto } from '$app/navigation';

    export let roomData: Room;

    let unsubscribe: Unsubscriber;

    async function enterRoom(): Promise<void> {
        if ($currentRoomId == roomData.roomId) return;

        $currentRoomId = roomData.roomId;
        $currentRoomData = roomData;

        $isInServer = true;

        $currentRoomLoaded = false;
        $currentRoomLoaded = true;
        $currentRoomMessages = [];
    }

    onMount(() => {
        socket.on('roomDataUpdated', ({ roomId, name, icon }) => {
            if (roomData.roomId == roomId) {
                roomData.name = name;
                roomData.icon = icon;
            }
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

{#if roomData.icon}
    <img
        class={`${$currentRoomId == roomData.roomId ? 'active' : ''}`}
        on:click={enterRoom}
        on:keydown={enterRoom}
        id="avatar"
        src={roomData.icon}
        alt={`${roomData.name}\'s avatar'`}
        draggable={false}
    />
{:else}
    <span
        class={`placeholder ${
            $currentRoomId == roomData.roomId ? 'placeholder-active' : ''
        }`}
        on:click={enterRoom}
        on:keydown={enterRoom}
        id="avatar"
    >
        <h1>{roomData.name[0]}{roomData.name[1] || ''}</h1></span
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
        border-radius: 25px;
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
        border-radius: 25px;
    }

    .placeholder:hover {
        background: var(--branding);
    }

    .placeholder h1 {
        font-size: 1.1rem;
        font-weight: 600;
    }

    .active {
        border-radius: 15px;
    }

    .placeholder-active {
        background: var(--branding);
        border-radius: 15px;
    }
</style>
