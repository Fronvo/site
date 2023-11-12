<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import Dm from './DM.svelte';
    import { currentRoomId, roomsList } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import type { Room as RoomType } from 'interfaces/all';
    import Room from './Room.svelte';
    import CreateRoomButton from './CreateServerButton.svelte';
    import CreateServerButton from './CreateServerButton.svelte';
    import RoomPlaceholder from '../rooms/RoomPlaceholder.svelte';
</script>

<div
    class="messages-container"
    in:fly={{ duration: 250 }}
    out:fade={{ duration: 50 }}
>
    <div class="dm-container">
        <h1>Direct messages</h1>
    </div>

    <div class="list-container">
        {#each { length: 10 } as _, i}
            <RoomPlaceholder opacity={1.2 - 1 + (1 - (i + 2) / 10)} />
            <!-- <RoomPlaceholder opacity={1} /> -->
        {/each}
    </div>
</div>

<style>
    .messages-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 235px;
        height: 100%;
        margin-top: 5px;
        flex: 1;
    }

    .dm-container {
        width: 190px;
        height: 20px;
        display: flex;
        margin-top: 5px;
    }

    .dm-container h1 {
        margin: 0;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: rgb(163, 167, 177);
        user-select: none;
        font-weight: 600;
    }

    .dm-container:hover h1 {
        color: white;
    }

    .list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 235px;
        height: 100%;
        margin-top: 10px;
        background: var(--primary);
        border-bottom-left-radius: 10px;
    }
</style>
