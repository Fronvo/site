<script lang="ts">
    import { activeDashboardTab } from 'stores/dashboard';
    import DashboardViewOptions from './DashboardViewOptions.svelte';
    import { DashboardOptions } from 'types/all';
    import DashboardProfile from './DashboardProfile.svelte';
    import DashboardPosts from './DashboardPosts.svelte';
    import DashboardFriends from './DashboardFriends.svelte';
    import DashboardAddFriend from './DashboardAddFriend.svelte';
</script>

<div class="dashboard-container">
    <DashboardViewOptions />

    {#if $activeDashboardTab == DashboardOptions.Dashboard}
        <DashboardPosts />
    {:else if $activeDashboardTab == DashboardOptions.Profile}
        <DashboardProfile />
    {:else if $activeDashboardTab == DashboardOptions.Friends}
        <DashboardFriends />
        <DashboardAddFriend />
    {/if}
</div>

<style>
    .dashboard-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-right: 17%;
        height: calc(100vh);
        overflow: hidden;
        background: var(--bg);
    }
</style>
