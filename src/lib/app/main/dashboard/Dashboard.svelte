<script lang="ts">
    import { activeDashboardTab, totalDashboardPosts } from 'stores/dashboard';
    import DashboardViewOptions from './DashboardViewOptions.svelte';
    import { DashboardOptions } from 'types/all';
    import DashboardProfile from './DashboardProfile.svelte';
    import DashboardPosts from './DashboardPosts.svelte';
    import DashboardFriends from './DashboardFriends.svelte';
    import DashboardFriendOptions from './DashboardFriendOptions.svelte';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';

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
    <DashboardViewOptions />

    {#if $activeDashboardTab == DashboardOptions.Dashboard}
        <DashboardPosts />
    {:else if $activeDashboardTab == DashboardOptions.Profile}
        <DashboardProfile />
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
        padding-right: 17%;
        height: calc(100vh);
        background: var(--bg);
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .overflow-hidden {
        overflow: hidden;
    }
</style>
