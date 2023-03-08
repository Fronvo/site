<script lang="ts">
    import Communities from '$lib/svgs/Communities.svelte';
    import Home from '$lib/svgs/Home.svelte';
    import Settings from '$lib/svgs/Settings.svelte';
    import Search from '$lib/svgs/Search.svelte';
    import { fly } from 'svelte/transition';
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
    import { cachedAccountData, guestMode } from 'stores/main';

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
</script>

<div in:fly={{ x: -100, duration: 1000 }} class="side-nav-container">
    <div
        id="component"
        on:click={() => {
            goto('/home', {
                replaceState: true,
            });

            switchPanel(PanelTypes.Home);
        }}
    >
        <Home />
        <h1>Home</h1>
    </div>

    <div id="component" on:click={decideSearchAction}>
        <Search />
        <h1>Search</h1>
    </div>

    <div id="component" on:click={decideCommunityAction}>
        <Communities />
        <h1>Community</h1>
    </div>

    <div
        id="component"
        on:click={() => {
            loadModal(ModalTypes.CreatePost);
        }}
    >
        <CreatePost />
        <h1>Share</h1>
    </div>

    <div
        id="component"
        on:click={() => loadDropdown(DropdownTypes.AccountOptions, false)}
    >
        <Account />
        <h1>{`${$ourData?.username ? $ourData?.username : 'Account'}`}</h1>
    </div>

    <div
        id="component"
        on:click={() => {
            loadDropdown(DropdownTypes.Settings, true);
        }}
    >
        <Settings />
        <h1>Settings</h1>
    </div>

    <!-- TODO: Enable in the future if more admin options are available -->
    <!-- <Admin /> -->
</div>

<style>
    .side-nav-container {
        position: fixed;
        width: max-content;
        height: 100vh;
        transition: 300ms background;
        z-index: 1;
    }

    #component {
        display: flex;
        align-items: center;
        padding: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 10px;
        width: max-content;
        cursor: pointer;
        transition: 300ms all;
    }

    #component:active {
        transform: scale(0.975);
        opacity: 0.75;
    }

    #component h1 {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin: 0;
        margin-left: 5px;
        font-size: 1.6rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: var(--profile_info_color);
        width: max-content;
        max-width: 150px;
        height: 35px;
    }

    @media screen and (max-width: 1024px) {
        #component {
            cursor: default;
            width: max-content;
        }

        #component h1 {
            display: none;
        }
    }

    @media screen and (max-width: 700px) {
        .side-nav-container {
            display: flex;
            right: 0;
            bottom: 0;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
            height: 60px;
            position: fixed;
            right: 0;
            left: 0;
            margin: auto;
            background: var(--bg_color);
            box-shadow: 0 0 10px var(--accent_shadow_color);
        }

        #component {
            margin: 0;
            padding: 0;
            padding-left: 8px;
            padding-right: 8px;
        }
    }
</style>
