<script lang="ts">
    import { currentServer } from 'stores/rooms';
    import PropChannel from '../rooms/PropChannel.svelte';
    import { showDropdown } from 'utilities/main';
    import {
        DropdownTypes,
        currentDropdownId,
        dropdownVisible,
    } from 'stores/dropdowns';
    import ServerChannel from '../rooms/ServerChannel.svelte';
    import { isMobile } from 'stores/main';

    let dropdownElement: HTMLDivElement;

    function showServerDropdown(): void {
        showDropdown(
            DropdownTypes.ServerSettings,
            dropdownElement,
            'bottom',
            45,
            20
        );
    }
</script>

<div class={`server-container ${$isMobile ? 'mobile' : ''}`}>
    <div
        class={`top ${
            $currentDropdownId == DropdownTypes.ServerSettings &&
            $dropdownVisible
                ? 'active'
                : ''
        }`}
        on:click={showServerDropdown}
        on:keydown={showServerDropdown}
        bind:this={dropdownElement}
    >
        <h1>{$currentServer.name}</h1>

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
        {#if $currentServer.channels.length > 0}
            {#each $currentServer.channels as channel}
                <ServerChannel {channel} />
            {/each}
        {:else}
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
        border-bottom: 1px solid var(--secondary);
        padding-top: 12px;
        padding-bottom: 12px;
        cursor: pointer;
    }

    .top:hover,
    .active {
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
        height: calc(100vh - 55px);
        margin: auto;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .mobile .channels {
        height: calc(100vh);
        padding-bottom: 20px;
    }

    .channels::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .channels:hover.channels::-webkit-scrollbar-thumb {
        background: var(--tertiary);
    }
</style>
