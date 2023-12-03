<script lang="ts">
    import { activeDashboardTab, totalDashboardPosts } from 'stores/dashboard';
    import DashboardViewOptions from './DashboardViewOptions.svelte';
    import { DashboardOptions } from 'types/all';
    import DashboardProfile from './DashboardProfile.svelte';
    import DashboardPosts from './DashboardPosts.svelte';
    import DashboardFriends from './DashboardFriends.svelte';
    import DashboardFriendOptions from './DashboardFriendOptions.svelte';
</script>

<div
    class={`dashboard-container ${
        $totalDashboardPosts == 0 ? 'overflow-hidden' : ''
    }`}
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
        overflow-y: scroll;
    }

    .overflow-hidden {
        overflow: hidden;
    }
</style>
