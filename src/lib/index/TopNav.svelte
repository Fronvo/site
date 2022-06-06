<script lang="ts">
    import { goto } from '$app/navigation';
    import type { ThemeContext } from 'src/interfaces/global';
    import { logoDurationExit, logoVisible } from 'src/stores';
    import { getContext } from 'svelte';
    import { scrollTop } from 'svelte-scrolling';
    import Switch from 'svelte-switch';
    import { fly } from 'svelte/transition';

    let { toggle, current }: ThemeContext = getContext('theme');

    $logoVisible = true;

    function moveToMain(): void {
        scrollTop();

        $logoVisible = false;

        setTimeout(() => {
            goto('app');
        }, $logoDurationExit);
    }
</script>

<div
    transition:fly={{ y: -100, duration: 750, opacity: 0.5 }}
    class="top-nav-container"
>
    <h1 id="logo">Fronvo</h1>

    <button id="try-1" on:click={moveToMain}>Try it online</button>

    <Switch
        checked={$current == 'dark'}
        on:change={toggle}
        onColor={'#0e0e0e'}
        offColor={'#e6e6e6'}
        height="32"
        width="64"
        offHandleColor={'#ffffff'}
        onHandleColor={'#000000'}
        handleDiameter={1}
        boxShadow={null}
        activeBoxShadow={null}
    >
        <!-- Custom switch state icons -->
        <svg
            slot="unCheckedIcon"
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            ><style></style><path
                d="m22.2 27.3q-2.6 1.2-5.5 1.2-2.7 0-5.1-1-2.4-1-4.2-2.7-1.7-1.6-2.8-3.9-1-2.4-1-4.9 0-4.2 2.6-7.5 2.6-3.3 6.7-4.5-2.1 3.3-2.1 7 0 3.6 1.8 6.6 1.9 3 5 4.8 3.2 1.7 6.9 1.7 1.1 0 2.2-0.1-1.8 2.1-4.5 3.3zm8.8-5.8q-0.1-0.3-0.4-0.6-0.6-0.6-1.5-0.3-2.2 1-4.6 1-3 0-5.6-1.4-2.5-1.4-4-3.9-1.5-2.4-1.5-5.3 0-2.2 0.9-4.3 0.9-2 2.7-3.5 0.7-0.6 0.3-1.4-0.3-0.8-1.2-0.8-3.2 0.1-5.9 1.4-2.8 1.2-4.8 3.2-2.1 2-3.2 4.7-1.2 2.7-1.2 5.7 0 3 1.2 5.8 1.3 2.8 3.4 4.8 2.1 2 5 3.2 2.9 1.2 6.1 1.2 4.5 0 8.4-2.4 3.8-2.3 5.8-6.3 0.1-0.4 0.1-0.8z"
            /></svg
        >

        <svg
            slot="checkedIcon"
            fill="white"
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            ><style></style><path
                d="m22.2 27.3q-2.6 1.2-5.5 1.2-2.7 0-5.1-1-2.4-1-4.2-2.7-1.7-1.6-2.8-3.9-1-2.4-1-4.9 0-4.2 2.6-7.5 2.6-3.3 6.7-4.5-2.1 3.3-2.1 7 0 3.6 1.8 6.6 1.9 3 5 4.8 3.2 1.7 6.9 1.7 1.1 0 2.2-0.1-1.8 2.1-4.5 3.3zm8.8-5.8q-0.1-0.3-0.4-0.6-0.6-0.6-1.5-0.3-2.2 1-4.6 1-3 0-5.6-1.4-2.5-1.4-4-3.9-1.5-2.4-1.5-5.3 0-2.2 0.9-4.3 0.9-2 2.7-3.5 0.7-0.6 0.3-1.4-0.3-0.8-1.2-0.8-3.2 0.1-5.9 1.4-2.8 1.2-4.8 3.2-2.1 2-3.2 4.7-1.2 2.7-1.2 5.7 0 3 1.2 5.8 1.3 2.8 3.4 4.8 2.1 2 5 3.2 2.9 1.2 6.1 1.2 4.5 0 8.4-2.4 3.8-2.3 5.8-6.3 0.1-0.4 0.1-0.8z"
            /></svg
        >
    </Switch>

    <button id="try-2" on:click={moveToMain}>Try it online</button>
</div>

<style>
    .top-nav-container {
        position: fixed;
        top: 0;
        right: 20px;
        left: 20px;
        display: flex;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 10px;
        justify-content: center;
        align-items: center;
        z-index: 1;
        background: var(--theme-nav_bg_color);
        box-shadow: 0 0 15px var(--theme-nav_shadow_color);
        transition: 300ms background;
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

    @media screen and (max-width: 800px) {
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
        }
    }
</style>
