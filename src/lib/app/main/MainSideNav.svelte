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
        margin: auto;
        margin-right: 10px;
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

    @media screen and (max-width: 700px) {
        .side-nav-container {
            display: flex;
            justify-content: center;
            align-items: center;
            border-top-right-radius: 0;
            border-bottom-left-radius: 25px;
            border-bottom-right-radius: 25px;
            padding: 15px;
            margin: 0;
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
    }
</style>
