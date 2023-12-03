<script lang="ts">
    import { activeDashboardTab } from 'stores/dashboard';
    import { ourData } from 'stores/profile';
    import { DashboardOptions } from 'types/all';

    function changeToDashboard(): void {
        changeTab(DashboardOptions.Dashboard);
    }

    function changeToFriends(): void {
        changeTab(DashboardOptions.Friends);
    }

    function changeToProfile(): void {
        changeTab(DashboardOptions.Profile);
    }

    function changeTab(tab: DashboardOptions): void {
        $activeDashboardTab = tab;
    }
</script>

<div class="options-container">
    <button
        class={`${
            $activeDashboardTab == DashboardOptions.Dashboard ? 'active' : ''
        } `}
        on:click={changeToDashboard}>Dashboard</button
    >
    <button
        class={`${
            $activeDashboardTab == DashboardOptions.Friends ? 'active' : ''
        } `}
        on:click={changeToFriends}
        >Friends{$ourData.pendingFriendRequests.length > 0
            ? `(${Math.min($ourData.pendingFriendRequests.length, 99)})`
            : ''}</button
    >
    <button
        class={`${
            $activeDashboardTab == DashboardOptions.Profile ? 'active' : ''
        } `}
        on:click={changeToProfile}>My profile</button
    >
</div>

<style>
    .options-container {
        position: sticky;
        top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 325px;
        border: 2px solid var(--branding);
        background: rgb(20, 20, 20, 0.5);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        margin-top: 10px;
        padding: 2px;
        z-index: 1;
    }

    button {
        width: 50%;
        background: transparent;
        box-shadow: none;
        font-size: 1rem;
        font-weight: 600;
        transition: 150ms;
        border-radius: 0;
    }

    button:nth-child(1) {
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
    }

    button:nth-child(3) {
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
    }

    button:hover {
        background: var(--branding);
    }

    .active {
        background: var(--branding);
    }
</style>
