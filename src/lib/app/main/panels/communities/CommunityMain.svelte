<script lang="ts">
    import { joinedCommunity } from 'stores/communities';
    import { fade } from 'svelte/transition';
    import CommunityChat from './CommunityChat.svelte';
    import CommunityInfo from './CommunityInfo.svelte';
    import CommunitySend from './CommunitySend.svelte';
</script>

<div class="main-container" in:fade={{ duration: 500 }}>
    <CommunityInfo />

    <CommunityChat />

    <CommunitySend />
</div>

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
