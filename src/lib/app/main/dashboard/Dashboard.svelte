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
    import { isInServer } from 'stores/rooms';
    import { goto } from '$app/navigation';
    import { isMobile } from 'stores/main';
    import DashboardMessages from './DashboardMessages.svelte';

    let dashboardContainer: HTMLDivElement;
    let unsubscribe: Unsubscriber;
    let unsubscribe2: Unsubscriber;

    onMount(() => {
        if (!dashboardContainer) return;

        unsubscribe = activeDashboardTab.subscribe((activeTab) => {
            if (!activeTab) return;

            setTimeout(() => {
                dashboardContainer.scrollTop = 0;
            }, 0);
        });

        unsubscribe2 = isInServer.subscribe((state) => {
            if (!state) {
                if ($activeDashboardTab == DashboardOptions.Dashboard) {
                    goto('/homepage');
                } else if ($activeDashboardTab == DashboardOptions.Profile) {
                    goto('/profile');
                } else if ($activeDashboardTab == DashboardOptions.Friends) {
                    goto('/friends');
                }
            }
        });
    });

    onDestroy(() => {
        unsubscribe();
        unsubscribe2();
    });
</script>

<div
    class={`dashboard-container ${
        $totalDashboardPosts == 0 ? 'overflow-hidden' : ''
    } ${$isMobile ? 'mobile' : ''}`}
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
    {:else if $activeDashboardTab == DashboardOptions.Messages}
        <DashboardMessages />
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

    .mobile {
        padding-right: 0;
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

        .mobile {
            padding-right: 0;
        }
    }
</style>
