<script lang="ts">
    import Dm from './DM.svelte';
    import { dmsList } from 'stores/rooms';
    import PropRoom from '../rooms/PropRoom.svelte';
    import { isMobile } from 'stores/main';
</script>

<div class={`list-container ${$isMobile ? 'mobile' : ''}`}>
    <h1>Messages</h1>
    {#if $dmsList.length == 0}
        {#each { length: $isMobile ? 5 : 15 } as _, i}
            <PropRoom opacity={1.4 - 1 + (1 - (i + 2) / 10)} />
        {/each}
    {:else}
        {#each $dmsList as dm}
            <Dm dmData={dm} />
        {/each}
    {/if}
</div>

<style>
    .list-container {
        width: 235px;
        margin: auto;
        padding-left: 5px;
        padding-right: 10px;
        padding-bottom: 5px;
        overflow-x: hidden;
    }

    .mobile {
        width: 100%;
        margin: 0;
    }

    h1 {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--gray);
        user-select: none;
        margin-bottom: 5px;
        margin-left: 10px;
        margin-top: 10px;
    }
</style>
