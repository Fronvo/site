<script lang="ts">
    import { goto } from '$app/navigation';
    import {
        communityLoadingFinished,
        joinedCommunity,
        targetCommunity,
        targetCommunityData,
    } from 'stores/communities';
    import { loginSucceeded } from 'stores/main';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import CommunityInvite from './communities/CommunityInvite.svelte';
    import CommunityMain from './communities/CommunityMain.svelte';
    import OfficialCommunity from './communities/OfficialCommunity.svelte';

    let unsubscribe: Unsubscriber;

    onMount(async () => {
        unsubscribe = loginSucceeded.subscribe(async (state) => {
            if (!state) return;

            // Only reload if needed
            // Events are always in the background

            if (!$communityLoadingFinished) {
                await loadCommunitiesPanel($targetCommunity);
            } else {
                if ($targetCommunity || $joinedCommunity) {
                    goto(`/community/${$targetCommunity || $joinedCommunity}`, {
                        replaceState: true,
                    });
                } else {
                    goto('/community', {
                        replaceState: true,
                    });
                }
            }
        });
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="communities-container" in:fade={{ duration: 500 }}>
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
