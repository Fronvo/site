<script lang="ts">
    import { activeDashboardTab, totalDashboardPosts } from 'stores/dashboard';
    import { DashboardOptions } from 'types/all';
    import DashboardProfile from './DashboardProfile.svelte';
    import DashboardPosts from './DashboardPosts.svelte';
    import DashboardFriends from './DashboardFriends.svelte';
    import DashboardFriendOptions from './DashboardFriendOptions.svelte';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import DashboardProfileOptions from './DashboardProfileOptions.svelte';

    let dashboardContainer: HTMLDivElement;
    let unsubscribe: Unsubscriber;

    onMount(() => {
        if (!dashboardContainer) return;

        unsubscribe = activeDashboardTab.subscribe((activeTab) => {
            if (!activeTab) return;

            setTimeout(() => {
                dashboardContainer.scrollTop = 0;
            }, 0);
        });
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div
    class={`dashboard-container ${
        $totalDashboardPosts == 0 ? 'overflow-hidden' : ''
    }`}
    bind:this={dashboardContainer}
>
    {#if $activeDashboardTab == DashboardOptions.Dashboard}
        <DashboardPosts />
    {:else if $activeDashboardTab == DashboardOptions.Profile}
        <DashboardProfile />
        <DashboardProfileOptions />
    {:else if $activeDashboardTab == DashboardOptions.Friends}
        <DashboardFriends />
        <DashboardFriendOptions />
    {/if}
</div>

<style>
    .dashboard-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-right: 20%;
        height: calc(100vh);
        overflow-x: hidden;
        overflow-y: scroll;
        z-index: 1;
    }

    .overflow-hidden {
        overflow: hidden;
    }

    .dashboard-container::-webkit-scrollbar {
        width: 10px;
    }

    .dashboard-container::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .dashboard-container:hover.dashboard-container::-webkit-scrollbar-thumb {
        background: var(--tertiary);
        width: 6px;
    }

    @media screen and (max-width: 1050px) {
        .dashboard-container {
            padding-right: 10%;
        }
    }
</style>
