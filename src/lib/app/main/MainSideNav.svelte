<script lang="ts">
    import Communities from '$lib/svgs/Communities.svelte';
    import Home from '$lib/svgs/Home.svelte';
    import Profile from '$lib/svgs/Profile.svelte';
    import Settings from '$lib/svgs/Settings.svelte';
    import { fly } from 'svelte/transition';
</script>

<div in:fly={{ y: 25, duration: 750, opacity: 0 }} class="side-nav-container">
    <Home />

    <br />

    <Profile />

    <br />

    <Communities />

    <br />

    <hr />

    <Settings />
</div>

<style>
    br {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .side-nav-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: max-content;
        height: fit-content;
        padding: 20px;
        background: var(--nav_bg_color);
        box-shadow: 0 0 10px var(--nav_shadow_color);
        transition: 300ms background;
        text-align: center;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        transition: 500ms all;
        z-index: 1;
    }

    @media screen and (max-width: 720px) {
        .side-nav-container {
            display: flex;
            justify-content: center;
            align-items: center;
            top: initial;
            right: 0;
            bottom: 0;
            height: 80px;
            border-bottom-right-radius: 0;
            border-top-left-radius: 25px;
        }

        hr {
            height: 100%;
            margin: 0;
        }
    }

    @media screen and (max-width: 520px) {
        .side-nav-container {
            height: 70px;
            padding: 15px;
        }
    }
</style>
