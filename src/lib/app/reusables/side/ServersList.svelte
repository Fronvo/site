<script lang="ts">
    import { serversList } from 'stores/rooms';
    import Server from './Server.svelte';
    import { isMobile } from 'stores/main';
    import CreateServerButton from './CreateServerButton.svelte';
    import JoinServerButton from './JoinServerButton.svelte';
    import HomeButton from '../top/HomeButton.svelte';
</script>

<div class={`servers-container ${$isMobile ? 'mobile' : ''}`}>
    <div class="list-container">
        {#if $isMobile}
            <HomeButton />
        {/if}

        {#if $serversList.length != 0}
            {#each $serversList as serverData}
                <Server {serverData} />
            {/each}
        {/if}

        {#if $isMobile}
            <CreateServerButton />
            <JoinServerButton />
        {/if}
    </div>
</div>

<style>
    .servers-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
    }

    .list-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 235px;
        margin-top: 12px;
        border-bottom-left-radius: 10px;
    }

    .mobile .list-container {
        width: max-content;
        overflow-y: auto;
        padding-left: 10px;
        padding-right: 5px;
        border-right: 1px solid var(--tertiary);
        padding-bottom: 10px;
    }

    .mobile .list-container::-webkit-scrollbar {
        display: none;
    }
</style>
