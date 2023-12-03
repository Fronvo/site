<script lang="ts">
    import type { Server } from 'interfaces/all';
    import { socket } from 'stores/main';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        currentServerChannels,
        currentServerId,
        currentServerName,
        isInServer,
    } from 'stores/rooms';
    import { onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { onDestroy } from 'svelte';

    export let serverData: Server;

    let unsubscribe: Unsubscriber;

    async function enterServer(): Promise<void> {
        if ($currentRoomId == serverData.serverId) return;

        // See last accessed channel with localStorage key
        $currentRoomId = undefined;
        $currentRoomData = undefined;

        $isInServer = true;
        $currentServerId = serverData.serverId;
        $currentServerName = serverData.name;
        $currentServerChannels = serverData.channels;

        $currentRoomMessages = [];
    }

    onMount(() => {
        socket.on('roomDataUpdated', ({ roomId, name, icon }) => {
            if (serverData.serverId == roomId) {
                serverData.name = name;
                serverData.icon = icon;
            }
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

{#if serverData.icon}
    <img
        class={`${$currentRoomId == serverData.serverId ? 'active' : ''}`}
        on:click={enterServer}
        on:keydown={enterServer}
        id="avatar"
        src={serverData.icon}
        alt={`${serverData.name}\'s avatar'`}
        draggable={false}
    />
{:else}
    <span
        class={`placeholder ${
            $currentServerId == serverData.serverId ? 'placeholder-active' : ''
        }`}
        on:click={enterServer}
        on:keydown={enterServer}
        id="avatar"
    >
        <h1>{serverData.name[0]}{serverData.name[1] || ''}</h1></span
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
        box-shadow: 0 0 10px var(--branding);
    }
</style>
