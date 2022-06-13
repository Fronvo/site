<script lang="ts">
    import Communities from 'src/lib/svgs/Communities.svelte';
    import Friends from 'src/lib/svgs/Friends.svelte';
    import Home from 'src/lib/svgs/Home.svelte';
    import Marketplace from 'src/lib/svgs/Marketplace.svelte';
    import { fly } from 'svelte/transition';
</script>

<div
    transition:fly={{ x: -100, duration: 750, opacity: 0.5 }}
    class="side-nav-container"
>
    <Home />

    <hr />

    <Friends />

    <br />

    <Communities />

    <br />

    <Marketplace />
</div>

<style>
    .side-nav-container {
        margin: auto;
        margin-right: 5px;
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
            padding: 15px;
            border-top-right-radius: 0;
            border-bottom-left-radius: 25px;
            margin-right: 0;
        }

        hr {
            display: none;
        }
    }

    @media screen and (max-width: 520px) {
        .side-nav-container {
            padding: 10px;
        }
    }
</style>
