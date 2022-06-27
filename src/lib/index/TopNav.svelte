<script lang="ts">
    import ThemeSwitch from '$lib/all/ThemeSwitch.svelte';
    import { indexVisible } from 'stores/index';
    import { fly } from 'svelte/transition';
    import { redirectApp } from 'utilities/index';
</script>

{#if $indexVisible}
    <div
        transition:fly={{ y: -100, duration: 750, opacity: 0.5 }}
        class="top-nav-container"
    >
        <h1 id="logo">Fronvo</h1>

        <button id="try-1" on:click={redirectApp}>Try Fronvo online</button>

        <ThemeSwitch />

        <button id="try-2" on:click={redirectApp}>Try it online</button>
    </div>
{/if}

<style>
    .top-nav-container {
        position: fixed;
        top: 0;
        right: 20px;
        left: 20px;
        display: flex;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 20px;
        justify-content: center;
        align-items: center;
        z-index: 1;
        background: var(--theme-nav_bg_color);
        box-shadow: 0 0 15px var(--theme-nav_shadow_color);
        transition: 300ms background;
        backdrop-filter: blur(5px);
    }

    .top-nav-container #logo {
        display: none;
    }

    .top-nav-container #try-1 {
        font-size: 1.7rem;
        margin-right: 20px;
    }

    .top-nav-container #try-2 {
        display: none;
    }

    .top-nav-container h1 {
        margin: 0;
    }

    .top-nav-container h1 {
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
        transition: 250ms all;
        margin-right: 20px;
        font-size: 1.9rem;
    }

    .top-nav-container h1:hover {
        color: var(--theme-text_color_hover);
    }

    @media screen and (max-width: 720px) {
        .top-nav-container h1 {
            font-size: 1.5rem;
        }

        .top-nav-container #try-1 {
            font-size: 1.3rem;
        }
    }

    @media screen and (max-width: 520px) {
        .top-nav-container {
            right: 5px;
            left: 5px;
        }

        .top-nav-container #logo {
            font-size: 2rem;
            margin-right: 10px;
            padding: 0;
            display: block;
            cursor: default;
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

        .top-nav-container #try-1 {
            display: none;
        }

        .top-nav-container #try-2 {
            display: initial;
            font-size: 1.2rem;
            margin-left: 5px;
            cursor: default;
        }
    }
</style>
