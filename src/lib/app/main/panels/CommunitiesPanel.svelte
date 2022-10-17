<script lang="ts">
    import {
        communityLoadingFinished,
        joinedCommunity,
        targetCommunity,
        targetCommunityData,
    } from 'stores/communities';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import CommunityInvite from './communities/CommunityInvite.svelte';
    import CommunityMain from './communities/CommunityMain.svelte';
    import OfficialCommunity from './communities/OfficialCommunity.svelte';

    onMount(async () => {
        await loadCommunitiesPanel($targetCommunity);
    });
</script>

<div class="communities-container" in:fade={{ duration: 200, delay: 200 }}>
    <!-- Wait for loading to finish -->
    {#if $communityLoadingFinished}
        <!-- If joined community is not filled, decide what to do -->
        {#if !$joinedCommunity}
            <!-- If theres no target, show the official community tab -->
            {#if !$targetCommunity || !$targetCommunityData}
                <OfficialCommunity />

                <!-- Otherwise just show the invite info -->
            {:else}
                <CommunityInvite />
            {/if}
        {:else}
            <!-- Show chat, community options -->
            <CommunityMain />
        {/if}
    {/if}
</div>

<style>
    .communities-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        flex: 1;
    }

    @media screen and (max-width: 720px) {
        .communities-container {
            margin-bottom: 100px;
        }
    }
</style>
