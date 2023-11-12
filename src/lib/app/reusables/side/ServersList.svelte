<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { roomsList } from 'stores/rooms';
    import Room from './Server.svelte';
</script>

<div
    class="messages-container"
    in:fly={{ duration: 250 }}
    out:fade={{ duration: 50 }}
>
    <div class="list-container">
        {#if $roomsList.length != 0}
            {#each $roomsList as roomData}
                <Room {roomData} />
            {/each}
        {/if}
    </div>
</div>

<style>
    .messages-container {
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
