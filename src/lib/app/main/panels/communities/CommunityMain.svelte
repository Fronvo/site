<script lang="ts">
    import { socket } from 'stores/global';
    import {
        initialCommunityLoadingFinished,
        joinedCommunity,
        targetCommunityMessages,
    } from 'stores/app/communities';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import CommunityChat from './CommunityChat.svelte';
    import CommunityInfo from './CommunityInfo.svelte';
    import CommunitySend from './CommunitySend.svelte';

    onMount(() => {
        socket.emit('fetchCommunityMessages', ({ communityMessages }) => {
            $targetCommunityMessages = communityMessages;

            $initialCommunityLoadingFinished = true;
        });
    });
</script>

{#if $joinedCommunity && $initialCommunityLoadingFinished}
    <div class="main-container" in:fade={{ duration: 500 }}>
        <CommunityInfo />

        <CommunityChat />

        <CommunitySend />
    </div>
{/if}

<svelte:head>
    <title>Fronvo | {$joinedCommunity?.name}</title>
</svelte:head>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        min-width: 600px;
    }

    @media screen and (max-width: 720px) {
        .main-container {
            min-width: 100%;
        }
    }
</style>
