<script lang="ts">
    import { roomsList } from 'stores/rooms';
    import Server from './Server.svelte';
</script>

<div class="servers-container">
    <div class="list-container">
        {#if $roomsList.length != 0}
            {#each $roomsList as roomData}
                <Server {roomData} />
            {/each}
        {/if}
    </div>
</div>

<style>
    .servers-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 235px;
        margin-top: 12px;
        border-bottom-left-radius: 10px;
    }
</style>
