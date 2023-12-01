<script lang="ts">
    import Dm from './DM.svelte';
    import { dmsList } from 'stores/rooms';
    import SearchBar from '../all/SearchBar.svelte';
    import PropRoom from '../rooms/PropRoom.svelte';
</script>

<div class="messages-container">
    {#if $dmsList.length > 0}
        <SearchBar />
    {/if}

    <div class="list-container">
        {#if $dmsList.length == 0}
            {#each { length: 20 } as _, i}
                <PropRoom opacity={1.4 - 1 + (1 - (i + 2) / 10)} />
            {/each}
        {:else}
            {#each $dmsList as dmData}
                <Dm {dmData} />
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
        margin-top: 10px;
        background: var(--primary);
        border-bottom-left-radius: 10px;
        overflow: hidden;
    }
</style>
