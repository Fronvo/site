<script lang="ts">
    import Dm from './DM.svelte';
    import { dmsList, roomsList } from 'stores/rooms';
    import PropRoom from '../rooms/PropRoom.svelte';

    let combined = [...$roomsList, ...$dmsList];
</script>

<div class="messages-container">
    <div class="list-container">
        {#if $dmsList.length == 0 && $roomsList.length == 0}
            {#each { length: 20 } as _, i}
                <PropRoom opacity={1.4 - 1 + (1 - (i + 2) / 10)} />
            {/each}
        {:else}
            {#each combined as room}
                <Dm dmData={room} />
            {/each}
        {/if}
    </div>
</div>

<style>
    .messages-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        flex: 1;
        overflow-y: auto;
        background: var(--primary);
    }

    .list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 235px;
        height: 100%;
        background: var(--primary);
        border-bottom-left-radius: 10px;
        overflow: hidden;
    }
</style>
