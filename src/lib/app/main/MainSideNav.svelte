<script lang="ts">
    import Communities from '$lib/svgs/Communities.svelte';
    import Friends from '$lib/svgs/Friends.svelte';
    import Home from '$lib/svgs/Home.svelte';
    import Marketplace from '$lib/svgs/Marketplace.svelte';
    import Settings from '$lib/svgs/Settings.svelte';
    import { fly } from 'svelte/transition';
</script>

<div
    in:fly={{ x: -100, duration: 750, opacity: 0.5 }}
    class="side-nav-container"
>
    <img
        id="avatar"
        src="svgs/home/avatar.svg"
        draggable={false}
        alt="Fronvo avatar"
    />

    <Home />

    <br />

    <Friends />

    <br />

    <Communities />

    <br />

    <Marketplace />

    <hr />

    <Settings />
</div>

<style>
    .side-nav-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: max-content;
        height: fit-content;
        padding: 20px;
        background: var(--theme-nav_bg_color);
        backdrop-filter: blur(5px);
        box-shadow: 0 0 10px var(--theme-nav_shadow_color);
        transition: 300ms background;
        text-align: center;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        transition: 500ms all;
    }

    .side-nav-container #avatar {
        display: none;
    }

    @media screen and (max-width: 720px) {
        .side-nav-container {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top-right-radius: 0;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px;
            padding: 15px;
            margin: 0;
        }

        .side-nav-container #avatar {
            display: initial;
            width: 64px;
            height: 64px;
            margin-right: 20px;
        }

        hr {
            height: 100%;
            margin: 0;
        }
    }

    @media screen and (max-width: 520px) {
        .side-nav-container {
            padding: 10px;
        }

        .side-nav-container #avatar {
            width: 48px;
            height: 48px;
        }
    }
</style>
