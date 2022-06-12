<script lang="ts">
    import Home from 'src/lib/svgs/Home.svelte';
    import { fly } from 'svelte/transition';
</script>

<div
    transition:fly={{ y: -100, duration: 750, opacity: 0.5 }}
    class="top-nav-container"
>
    <h1 id="logo">Fronvo</h1>

    <Home />
</div>

<style>
    .top-nav-container {
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        padding-top: 10px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 10px;
        align-items: center;
        z-index: 1;
        background: var(--theme-nav_bg_color);
        box-shadow: 0 0 10px var(--theme-nav_shadow_color);
        transition: 300ms background;
        backdrop-filter: blur(5px);
    }

    .top-nav-container #logo {
        font-size: 2.5rem;
        margin: 0;
        padding: 0;
        display: block;
        cursor: default;
        width: 48%;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .top-nav-container #logo:hover {
        color: var(--theme-text_color);
    }

    @media screen and (max-width: 520px) {
        .top-nav-container #logo {
            font-size: 2rem;
        }
    }
</style>
