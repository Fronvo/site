<script lang="ts">
    import { joinedCommunity } from 'stores/communities';
    import { fade } from 'svelte/transition';
    import { setTitle } from 'utilities/main';
    import CommunityChat from './CommunityChat.svelte';
    import CommunityInfo from './CommunityInfo.svelte';
    import CommunitySend from './CommunitySend.svelte';

    setTitle(`${$joinedCommunity.name} - Fronvo`);
</script>

<div class="main-container" in:fade={{ duration: 500 }}>
    <CommunityInfo />

    <CommunityChat />

    <CommunitySend />
</div>

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
