<script lang="ts">
    import { roomsList } from 'stores/rooms';
    import Room from './Server.svelte';
</script>

<div class="servers-container">
    <div class="list-container">
        {#if $roomsList.length != 0}
            {#each $roomsList as roomData}
                <Room {roomData} />
            {/each}
        {/if}
    </div>
</div>

<style>
    .servers-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 5px;
        overflow-y: auto;
    }

    .list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 235px;
        height: 100%;
        margin-top: 10px;
        border-bottom-left-radius: 10px;
    }
</style>
