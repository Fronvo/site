<script lang="ts">
    import Communities from '$lib/svgs/Communities.svelte';
    import Home from '$lib/svgs/Home.svelte';
    import Settings from '$lib/svgs/Settings.svelte';
    import Search from '$lib/svgs/Search.svelte';
    import {
        dismissDropdown,
        showDropdown,
        showModal,
        switchPanel,
    } from 'utilities/main';
    import { goto } from '$app/navigation';
    import CreatePost from '$lib/svgs/CreatePost.svelte';
    import Account from '$lib/svgs/Account.svelte';
    import { ourData, searchData } from 'stores/profile';
    import { loadTargetProfile } from 'utilities/profile';
    import { currentPanelId, PanelTypes } from 'stores/panels';
    import { DropdownTypes, dropdownVisible } from 'stores/dropdowns';
    import { ModalTypes } from 'stores/modals';
    import { cachedAccountData, guestMode, sideNavRevealed } from 'stores/main';
    import type { MainSideItem } from 'interfaces/all';
    import Reveal from '$lib/svgs/Reveal.svelte';
    import { fade, fly } from 'svelte/transition';
    import { setKey } from 'utilities/global';

    function loadPanel(panel: PanelTypes): void {
        if (!$guestMode) {
            switchPanel(panel);
        } else {
            showModal(ModalTypes.JoinFronvo);
        }
    }

    function loadModal(modal: ModalTypes): void {
        if (!$guestMode) {
            showModal(modal);
        } else {
            showModal(ModalTypes.JoinFronvo);
        }
    }

    function loadDropdown(
        dropdown: DropdownTypes,
        guestEnabled?: boolean
    ): void {
        if ($guestMode && !guestEnabled) {
            showModal(ModalTypes.JoinFronvo);
            return;
        }

        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            showDropdown(dropdown);
        }
    }

    function decideSearchAction(): void {
        if (
            $searchData &&
            $searchData?.profileId != $ourData?.profileId &&
            $currentPanelId != PanelTypes.Profile
        ) {
            loadTargetProfile($searchData.profileId, $cachedAccountData);
        } else {
            loadModal(ModalTypes.Search);
        }
    }

    function decideCommunityAction(): void {
        if (!$ourData?.isInCommunity || $guestMode) {
            loadDropdown(DropdownTypes.Community);
        } else {
            loadPanel(PanelTypes.Community);
        }
    }

    function toggleReveal(): void {
        $sideNavRevealed = !$sideNavRevealed;
        setKey('revealNav', $sideNavRevealed);
    }

    // Actions
    function actionHome(): void {
        goto('/home', {
            replaceState: true,
        });

        switchPanel(PanelTypes.Home);
    }

    const items: MainSideItem[] = [
        {
            title: 'Home',
            svg: Home,
            action: actionHome,
        },
        {
            title: 'Search',
            svg: Search,
            action: decideSearchAction,
        },
        {
            title: 'Messages',
            svg: Communities,
            action: decideCommunityAction,
        },
        {
            title: 'Share',
            svg: CreatePost,
            action: () => loadModal(ModalTypes.CreatePost),
        },
        {
            title: $ourData?.username || 'Account',
            svg: Account,
            action: () => loadDropdown(DropdownTypes.AccountOptions, false),
            hideOnReveal: true,
        },
        {
            title: 'Settings',
            svg: Settings,
            action: () => loadDropdown(DropdownTypes.Settings, true),
        },
    ];
</script>

<div class="side-nav-container" in:fade={{ duration: 250 }}>
    <div class="nav-top-container">
        {#each items as { title, action, svg, hideOnReveal }}
            <div
                class={`component ${
                    hideOnReveal && $sideNavRevealed ? 'reveal' : ''
                }`}
                on:click={action}
            >
                <svelte:component this={svg} />

                {#if $sideNavRevealed}
                    <h1 in:fly={{ duration: 300, x: -10 }}>{title}</h1>
                {/if}
            </div>
        {/each}
    </div>

    <div class="nav-bottom-container" in:fade={{ duration: 300 }}>
        {#if $sideNavRevealed}
            <div
                class="account-container"
                on:click={() =>
                    loadDropdown(DropdownTypes.AccountOptions, false)}
            >
                <Account />
                <h1>{$ourData?.username || 'Account'}</h1>
            </div>
        {/if}

        <Reveal callback={toggleReveal} />
    </div>
</div>

<style>
    .side-nav-container {
        position: sticky;
        width: max-content;
        max-width: 20%;
        height: 100vh;
        transition: 150ms background;
        z-index: 2;
        left: 0;
        top: 0;
        background: var(--side_bg_color);
    }

    .nav-top-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 92.5%;
        flex: 1;
    }

    .component {
        display: flex;
        align-items: center;
        padding: 8px;
        margin: 10px;
        margin-top: 0;
        margin-bottom: 0;
        border-radius: 20px;
        cursor: pointer;
        transition: 50ms all;
    }

    .reveal {
        display: none;
    }

    .component:nth-child(1) {
        margin-top: 10px;
    }

    .component:hover {
        background: var(--side_svg_bg_color);
        border-radius: 10px;
    }

    .component:active {
        transform: scale(0.975);
    }

    .component h1 {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin: 0;
        margin-left: 5px;
        font-size: 1.4rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: var(--profile_info_color);
        width: max-content;
        cursor: pointer;
        transition: 150ms all;
    }

    .nav-bottom-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 5px;
        margin: 10px;
        margin-left: 5px;
        margin-right: 5px;
        margin-top: 0;
        border-radius: 20px;
        transition: 100ms all;
    }

    .account-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        padding: 5px;
        flex: 1;
        transition: 150ms;
    }

    .account-container:hover {
        background: var(--side_svg_bg_color);
        border-radius: 5px;
    }

    .account-container:active {
        transform: scale(0.975);
    }

    .account-container h1 {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin: 0;
        margin-left: 2px;
        font-size: 1.4rem;
        max-width: 100px;
        flex: 1;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: var(--profile_info_color);
        width: max-content;
        cursor: pointer;
        transition: 150ms all;
    }

    @media screen and (max-width: 1100px) {
        .nav-top-container {
            height: 88%;
        }

        .nav-bottom-container {
            flex-direction: column;
            justify-content: center;
            width: 100%;
        }

        .account-container {
            width: max-content;
        }
    }

    @media screen and (max-width: 850px) {
        .side-nav-container {
            width: 100%;
            max-width: 100%;
            height: 65px;
            position: fixed;
            top: initial;
            bottom: 0;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background: var(--bg_color);
            box-shadow: 0 0 10px var(--accent_shadow_color);
        }

        .nav-top-container {
            flex-direction: row;
            justify-content: center;
        }

        .nav-bottom-container {
            display: none;
        }

        .component {
            background: none;
            margin: 0;
            padding: 0;
            width: 20%;
            margin-left: 2.5%;
            margin-right: 2.5%;
        }

        .reveal {
            display: initial;
            align-self: center;
        }

        .component:nth-child(1) {
            margin-top: 0;
        }

        .component:hover {
            background: transparent;
        }

        .component h1 {
            display: none;
        }
    }
</style>
