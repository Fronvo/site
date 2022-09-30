<script lang="ts">
    import { goto } from '$app/navigation';
    import {
        joinedCommunity,
        targetCommunity,
        targetCommunityData,
    } from 'stores/app/communities';
    import { onDestroy, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { loadCommunitiesPanel } from 'utilities/app/communities';
    import CommunityInvite from './communities/CommunityInvite.svelte';
    import CommunityMain from './communities/CommunityMain.svelte';
    import OfficialCommunity from './communities/OfficialCommunity.svelte';

    let loadingFinished = false;

    goto(`/community/${$targetCommunity ? $targetCommunity : ''}`, {
        replaceState: true,
    });

    onMount(async () => {
        // If already in a community, redirect
        // Otherwise load community panel / get invite info
        await loadCommunitiesPanel($targetCommunity);

        // Correct url if in a community
        if ($joinedCommunity) {
            goto(`/community/${$joinedCommunity.communityId}`, {
                replaceState: true,
            });
        }

        loadingFinished = true;
    });

    // Reset community variables
    onDestroy(() => {
        $targetCommunity = undefined;
        $targetCommunityData = undefined;
    });
</script>

<div class="communities-container" in:fade={{ duration: 200, delay: 200 }}>
    <!-- Wait for loading to finish -->
    {#if loadingFinished}
        <!-- If joined community is not filled, decide what to do -->
        {#if !$joinedCommunity}
            <!-- If theres no target, show the official community tab -->
            {#if !$targetCommunity && !$targetCommunityData}
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
