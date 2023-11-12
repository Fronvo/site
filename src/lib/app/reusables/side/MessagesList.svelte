<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import Dm from './DM.svelte';
    import { dmsList } from 'stores/rooms';
    import RoomPlaceholder from '../rooms/RoomPlaceholder.svelte';
    import SearchBar from '../all/SearchBar.svelte';
</script>

<div
    class="messages-container"
    in:fly={{ duration: 250 }}
    out:fade={{ duration: 50 }}
>
    <div class="dm-container">
        <h1>Direct messages</h1>
    </div>

    {#if $dmsList.length > 0}
        <SearchBar />
    {/if}

    <div class="list-container">
        {#if $dmsList.length == 0}
            {#each { length: 20 } as _, i}
                <RoomPlaceholder opacity={1.4 - 1 + (1 - (i + 2) / 10)} />
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
        width: 240px;
        height: 100%;
        margin-top: 5px;
        flex: 1;
        overflow-y: auto;
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
        overflow: hidden;
    }
</style>
