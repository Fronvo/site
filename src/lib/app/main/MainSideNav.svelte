<script lang="ts">
    import Communities from '$lib/svgs/Communities.svelte';
    import Home from '$lib/svgs/Home.svelte';
    import Profile from '$lib/svgs/Profile.svelte';
    import Settings from '$lib/svgs/Settings.svelte';
    import Search from '$lib/svgs/Search.svelte';
    import { fly } from 'svelte/transition';
    import { showModal, switchPanel } from 'utilities/main';
    import { ModalTypes, PanelTypes } from 'types/main';
    import { currentPanelId } from 'stores/main';
    import { ourProfileData, targetProfile, userData } from 'stores/profile';
    import { loadProfilePanel } from 'utilities/profile';

    async function decideProfileAction(): Promise<void> {
        if (
            $currentPanelId == PanelTypes.Profile &&
            $userData.profileId != $ourProfileData.profileId
        ) {
            await loadProfilePanel();

            $targetProfile = undefined;
        } else {
            switchPanel(PanelTypes.Profile);
        }
    }
</script>

<div id="blur" in:fly={{ x: -100, duration: 1000 }} class="side-nav-container">
    <div id="component" on:click={() => switchPanel(PanelTypes.Home)}>
        <Home />
        <h1>Home</h1>
    </div>

    <div id="component" on:click={decideProfileAction}>
        <Profile />
        <h1>Profile</h1>
    </div>

    <div id="component" on:click={() => switchPanel(PanelTypes.Communities)}>
        <Communities />
        <h1>Community</h1>
    </div>

    <div id="component" on:click={() => showModal(ModalTypes.FindProfiles)}>
        <Search />
        <h1>Search</h1>
    </div>

    <div
        id="component"
        on:click={() => {
            showModal(ModalTypes.Settings);
        }}
    >
        <Settings />
        <h1>Settings</h1>
    </div>
</div>

<style>
    .side-nav-container {
        position: fixed;
        width: max-content;
        padding: 10px;
        height: 100vh;
        background: var(--accent_bg_color);
        transition: 300ms background;
        transition: 500ms all;
        z-index: 1;
        backdrop-filter: brightness(50%);
    }

    #component {
        display: flex;
        align-items: center;
        text-align: center;
        transition: 100ms;
        padding: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 10px;
        cursor: pointer;
        transition: 100ms;
    }

    #component:active {
        transform: scale(0.975);
        opacity: 0.75;
    }

    #component h1 {
        margin: 0;
        margin-left: 5px;
        font-size: 1.7rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 1024px) {
        #component {
            cursor: default;
        }

        #component h1 {
            display: none;
        }
    }

    @media screen and (max-width: 520px) {
        .side-nav-container {
            display: flex;
            right: 0;
            bottom: 0;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
            height: 65px;
            padding: 10px;
            position: fixed;
            right: 0;
            left: 0;
            margin: auto;
        }

        #component {
            padding: 5px;
        }
    }
</style>
