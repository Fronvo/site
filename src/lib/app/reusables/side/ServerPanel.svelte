<script lang="ts">
    import { currentServerChannels, currentServerName } from 'stores/rooms';
    import PropChannel from '../rooms/PropChannel.svelte';
</script>

<div class="server-container">
    <div class="top">
        <h1>{$currentServerName}</h1>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m19 9l-7 6l-7-6"
            /></svg
        >
    </div>

    <div class="channels">
        {#if $currentServerChannels.length > 0}{:else}
            {#each { length: 15 } as _, i}
                <PropChannel opacity={1 - 0.8 + (1 - (i + 2.5) / 12.5)} />
            {/each}
        {/if}
    </div>
</div>

<style>
    .server-container {
        width: 235px;
        flex: 1;
        user-select: none;
    }

    .top {
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 15px;
        transition: 125ms;
        border-bottom: 1px solid rgb(23, 23, 23);
        box-shadow: 0 0 10px rgb(25, 25, 25);
        padding-top: 5px;
        padding-bottom: 5px;
        cursor: pointer;
    }

    .top:hover {
        background: var(--secondary);
    }

    .top h1 {
        font-size: 1rem;
        font-weight: 600;
        flex: 1;
    }

    .top svg {
        width: 22px;
        height: 22px;
        fill: var(--text);
        stroke: var(--text);
    }

    .channels {
        width: 100%;
        max-height: calc(100vh - 55px - 57px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
        padding-right: 10px;
        padding-top: 15px;
        overflow-y: scroll;
    }

    .channels::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .channels:hover.channels::-webkit-scrollbar-thumb {
        background: var(--secondary);
    }
</style>
