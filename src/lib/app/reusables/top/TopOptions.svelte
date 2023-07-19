<script lang="ts">
    import RoomPanel from '$lib/app/reusables/top/RoomPanel.svelte';
    import { currentTopPanel, darkTheme } from 'stores/main';
    import { setKey } from 'utilities/global';
    import FriendsPanel from './FriendsPanel.svelte';
    import MarketplacePanel from './MarketplacePanel.svelte';
    import AdminPanel from './AdminPanel.svelte';
    import { currentRoomLoaded } from 'stores/rooms';
    import { ourData } from 'stores/profile';
    import type { Unsubscriber } from 'svelte/store';
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';
    import { TopPanels } from 'types/all';
    import { toast } from 'svelte-sonner';

    let panels = [RoomPanel, FriendsPanel, MarketplacePanel, AdminPanel];

    let unsubscribe: Unsubscriber;

    function switchPanel(panel: TopPanels): void {
        $currentTopPanel = panel;
    }

    function toggleTheme(): void {
        $darkTheme = !$darkTheme;
        setKey('darkTheme', $darkTheme);

        toast(`Theme changed to ${$darkTheme ? 'dark' : 'light'}`);
    }

    onMount(() => {
        currentRoomLoaded.subscribe((newId) => {
            if (!newId) {
                switchPanel(TopPanels.Friends);
                return;
            }

            switchPanel(TopPanels.Edit);
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

<div class="options-container">
    <div id="first">
        {#if $currentRoomLoaded}
            {#if $currentTopPanel == TopPanels.Edit}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><path
                        fill="var(--branding)"
                        fill-rule="evenodd"
                        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10ZM8 13a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm4 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm4 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                        clip-rule="evenodd"
                    /></svg
                >
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    on:click={() => switchPanel(TopPanels.Edit)}
                    on:keydown={() => switchPanel(TopPanels.Edit)}
                    ><g fill="none" stroke="var(--branding)"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 12h.009m3.995 0h.01m3.977 0H16"
                        /><circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke-width="1.5"
                        /></g
                    ></svg
                >
            {/if}
        {/if}

        {#if $currentTopPanel == TopPanels.Friends}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><g fill="var(--branding)"
                    ><circle cx="15" cy="6" r="3" opacity=".4" /><ellipse
                        cx="16"
                        cy="17"
                        opacity=".4"
                        rx="5"
                        ry="3"
                    /><circle cx="9.001" cy="6" r="4" /><ellipse
                        cx="9.001"
                        cy="17.001"
                        rx="7"
                        ry="4"
                    /></g
                ></svg
            >
        {:else}
            <div class="friends-container">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    on:click={() => switchPanel(TopPanels.Friends)}
                    on:keydown={() => switchPanel(TopPanels.Friends)}
                    ><g fill="none" stroke="var(--branding)" stroke-width="1.5"
                        ><circle cx="9" cy="6" r="4" /><path
                            d="M12.5 4.341a3 3 0 1 1 0 3.318"
                            opacity=".5"
                        /><ellipse cx="9" cy="17" rx="7" ry="4" /><path
                            stroke-linecap="round"
                            d="M18 14c1.754.385 3 1.359 3 2.5c0 1.03-1.014 1.923-2.5 2.37"
                            opacity=".5"
                        /></g
                    ></svg
                >
                {#if $ourData.pendingFriendRequests.length > 0}
                    <div class="indicator" />
                {/if}
            </div>
        {/if}

        {#if $currentTopPanel == TopPanels.Marketplace}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><path
                    fill="var(--branding)"
                    d="M3.778 3.655c-.181.36-.27.806-.448 1.696l-.598 2.99a3.06 3.06 0 1 0 6.043.904l.07-.69a3.167 3.167 0 1 0 6.306-.038l.074.728a3.06 3.06 0 1 0 6.043-.904l-.598-2.99c-.178-.89-.267-1.335-.448-1.696a3 3 0 0 0-1.888-1.548C17.944 2 17.49 2 16.582 2H7.418c-.908 0-1.362 0-1.752.107a3 3 0 0 0-1.888 1.548Zm14.49 9.845a4.53 4.53 0 0 0 2.232-.581V14c0 3.771 0 5.657-1.172 6.828c-.943.944-2.348 1.127-4.828 1.163V18.5c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.549C13.402 16 12.935 16 12 16s-1.402 0-1.75.201a1.5 1.5 0 0 0-.549.549c-.201.348-.201.815-.201 1.75v3.491c-2.48-.036-3.885-.22-4.828-1.163C3.5 19.657 3.5 17.771 3.5 14v-1.081a4.53 4.53 0 0 0 2.232.581a4.549 4.549 0 0 0 3.112-1.228A4.643 4.643 0 0 0 12 13.5a4.644 4.644 0 0 0 3.155-1.228A4.549 4.549 0 0 0 18.27 13.5Z"
                /></svg
            >
        {:else}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                on:click={() => switchPanel(TopPanels.Marketplace)}
                on:keydown={() => switchPanel(TopPanels.Marketplace)}
                ><g fill="none" stroke="var(--branding)" stroke-width="1.5"
                    ><path
                        d="M3.5 11v3c0 3.771 0 5.657 1.172 6.828C5.843 22 7.729 22 11.5 22h1c3.771 0 5.657 0 6.828-1.172C20.5 19.657 20.5 17.771 20.5 14v-3"
                    /><path
                        d="M9.5 2h5l.652 6.517a3.167 3.167 0 1 1-6.304 0L9.5 2Z"
                    /><path
                        d="M3.33 5.351c.178-.89.267-1.335.448-1.696a3 3 0 0 1 1.888-1.548C6.056 2 6.51 2 7.418 2H9.5l-.725 7.245a3.06 3.06 0 1 1-6.043-.904l.598-2.99Zm17.34 0c-.178-.89-.267-1.335-.448-1.696a3 3 0 0 0-1.888-1.548C17.944 2 17.49 2 16.582 2H14.5l.725 7.245a3.06 3.06 0 1 0 6.043-.904l-.598-2.99Z"
                    /><path
                        stroke-linecap="round"
                        d="M9.5 21.5v-3c0-.935 0-1.402.201-1.75a1.5 1.5 0 0 1 .549-.549C10.598 16 11.065 16 12 16s1.402 0 1.75.201a1.5 1.5 0 0 1 .549.549c.201.348.201.815.201 1.75v3"
                    /></g
                ></svg
            >
        {/if}

        {#if $ourData.profileId == 'fronvo'}
            {#if $currentTopPanel == TopPanels.Admin}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g fill="var(--branding)"
                        ><path
                            fill-rule="evenodd"
                            d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473V2c-.811 0-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082Z"
                            clip-rule="evenodd"
                        /><path
                            d="M21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2v20c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991Z"
                            opacity=".6"
                        /></g
                    ></svg
                >
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    on:click={() => switchPanel(TopPanels.Admin)}
                    on:keydown={() => switchPanel(TopPanels.Admin)}
                    ><g fill="none" stroke="var(--branding)" stroke-width="1.5"
                        ><path
                            d="M12 22c-1.02 0-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574c0-3.198 0-4.797.378-5.334C3.755 4.545 5.258 4.03 8.265 3l.573-.196C10.405 2.268 11.188 2 12 2"
                        /><path
                            d="M12 22c1.02 0 1.38-.158 2.101-.473c2.66-1.162 6.9-3.898 6.9-9.536v-1.574c0-3.198 0-4.797-.378-5.334c-.378-.538-1.881-1.053-4.888-2.082l-.573-.196C13.595 2.268 12.812 2 12 2"
                            opacity=".6"
                        /></g
                    ></svg
                >
            {/if}
        {/if}

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            on:click={toggleTheme}
            on:keydown={toggleTheme}
            ><path
                fill="var(--text)"
                fill-rule="evenodd"
                d={`${
                    !$darkTheme
                        ? 'M12 1.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75ZM3.669 3.716a.75.75 0 0 1 1.06-.047L6.95 5.7a.75.75 0 1 1-1.012 1.107L3.716 4.776a.75.75 0 0 1-.047-1.06Zm16.662 0a.75.75 0 0 1-.047 1.06l-2.222 2.031A.75.75 0 0 1 17.05 5.7l2.222-2.031a.75.75 0 0 1 1.06.047ZM12 7.75a4.25 4.25 0 1 0 0 8.5a4.25 4.25 0 0 0 0-8.5ZM6.25 12a5.75 5.75 0 1 1 11.5 0a5.75 5.75 0 0 1-11.5 0Zm-5 0a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75Zm18 0a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75Zm-2.224 5.025a.75.75 0 0 1 1.06 0l2.222 2.223a.75.75 0 0 1-1.06 1.06l-2.223-2.222a.75.75 0 0 1 0-1.06Zm-10.051 0a.75.75 0 0 1 0 1.061l-2.223 2.222a.75.75 0 0 1-1.06-1.06l2.222-2.223a.75.75 0 0 1 1.06 0ZM12 19.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Z'
                        : 'm21.067 11.857l-.642-.388l.642.388Zm-8.924-8.924l-.388-.642l.388.642ZM21.25 12A9.25 9.25 0 0 1 12 21.25v1.5c5.937 0 10.75-4.813 10.75-10.75h-1.5ZM12 21.25A9.25 9.25 0 0 1 2.75 12h-1.5c0 5.937 4.813 10.75 10.75 10.75v-1.5ZM2.75 12A9.25 9.25 0 0 1 12 2.75v-1.5C6.063 1.25 1.25 6.063 1.25 12h1.5Zm12.75 2.25A5.75 5.75 0 0 1 9.75 8.5h-1.5a7.25 7.25 0 0 0 7.25 7.25v-1.5Zm4.925-2.781A5.746 5.746 0 0 1 15.5 14.25v1.5a7.247 7.247 0 0 0 6.21-3.505l-1.285-.776ZM9.75 8.5a5.747 5.747 0 0 1 2.781-4.925l-.776-1.284A7.246 7.246 0 0 0 8.25 8.5h1.5ZM12 2.75a.384.384 0 0 1-.268-.118a.285.285 0 0 1-.082-.155c-.004-.031-.002-.121.105-.186l.776 1.284c.503-.304.665-.861.606-1.299c-.062-.455-.42-1.026-1.137-1.026v1.5Zm9.71 9.495c-.066.107-.156.109-.187.105a.285.285 0 0 1-.155-.082a.384.384 0 0 1-.118-.268h1.5c0-.717-.571-1.075-1.026-1.137c-.438-.059-.995.103-1.299.606l1.284.776Z'
                }`}
                clip-rule="evenodd"
            /></svg
        >
    </div>

    <div id="content">
        <svelte:component this={panels[$currentTopPanel]} />
    </div>
</div>

<style>
    .options-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 275px;
        border-left: 1px solid var(--primary);
        height: 100vh;
        box-shadow: 0 0 4px var(--message_shadow);
        z-index: 1;
    }

    #first {
        width: 100%;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid var(--primary);
    }

    #content {
        width: 100%;
    }

    svg {
        width: 42px;
        height: 42px;
        padding: 7px;
        border-radius: 10px;
        margin-left: 8px;
    }

    svg:hover {
        background: var(--primary);
    }

    .friends-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .indicator {
        position: absolute;
        transform: translateX(11px) translateY(-10px);
        width: 8px;
        height: 8px;
        background: var(--branding);
        box-shadow: 0 0 5px var(--branding);
        border-radius: 20px;
        pointer-events: none;
    }
</style>
