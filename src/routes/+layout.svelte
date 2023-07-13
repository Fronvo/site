<script lang="ts">
    import Main from '$lib/app/main/Main.svelte';
    import { onMount } from 'svelte';
    import themingVars from 'svelte-css-vars';
    import {
        dismissDropdown,
        dismissModal,
        initSocket,
        setTitle,
    } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import '../app.css';
    import { currentTheme, defaultTheme, whiteTheme } from '../themes';
    import FronvoLoading from '$lib/app/FronvoLoading.svelte';
    import { fade } from 'svelte/transition';
    import {
        darkTheme,
        fronvoTitle,
        loginSucceeded,
        showLayout,
    } from 'stores/main';
    import { goto } from '$app/navigation';
    import { dropdownAnimationFinished } from 'stores/dropdowns';

    let mountReady = false;

    function setupVars(): void {
        // Try our best to default to dark
        $darkTheme = !getKey('darkTheme') || getKey('darkTheme') == 'true';
    }

    function setupTheming(): void {
        darkTheme.subscribe((dark) => {
            if (typeof dark == 'undefined') {
                return;
            }

            currentTheme.set(dark ? defaultTheme : whiteTheme);

            // Hacky but works for background color
            document.documentElement.style.setProperty(
                '--bg',
                dark ? defaultTheme.bg : whiteTheme.bg
            );
        });
    }

    function setupLayout(): void {
        // When layout is visible, perform socket actions
        showLayout.subscribe(async (state) => {
            // While loading, default to this
            setTitle('Fronvo');

            if (state) {
                const val = window.navigator.userAgent.toLowerCase();

                // Block access to mobile, get the app
                if (val.includes('android') || val.includes('iphone')) {
                    goto('/', {
                        replaceState: true,
                    });

                    return;
                }

                initSocket();
            }
        });
    }

    function setupListeners(): void {
        document.addEventListener('keydown', (ev) => {
            if (ev.key == 'Escape') {
                dismissModal();
                dismissDropdown();
            }
        });

        document.addEventListener('click', () => {
            if ($dropdownAnimationFinished) {
                dismissDropdown();
            }
        });
    }

    onMount(() => {
        mountReady = true;

        setupVars();
        setupTheming();
        setupLayout();
        setupListeners();
    });
</script>

<svelte:head>
    <title>{$fronvoTitle}</title>
</svelte:head>

<div use:themingVars={{ ...$currentTheme }}>
    {#if mountReady}
        {#if $showLayout}
            {#if $loginSucceeded == undefined}
                <div out:fade={{ duration: 250 }}>
                    <FronvoLoading />
                </div>
            {:else}
                <Main />
            {/if}
        {/if}

        <slot />
    {/if}
</div>

<style>
    :global(body) {
        background: var(--bg);
    }

    /* Elegant theme feature */
    :global(#blur) {
        backdrop-filter: blur(3px);
        background: none;
    }

    /* Checkboxes */
    :global(.checkbox) {
        margin-left: 15px;
    }

    /* Links */
    :global(.link) {
        text-decoration: underline;
        color: var(--text);
    }

    /* Modal-related */
    :global(.modal-header) {
        color: var(--text);
        margin: 0;
        font-size: var(--modal_header_size);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global(.modal-error-header) {
        color: red;
        margin-bottom: 10px;
        width: 90%;
        text-align: center;
    }

    :global(.modal-input) {
        font-size: var(--modal_input_size);
        margin: 0 5px 10px 5px;
        width: 400px;
        background: var(--modal_input_bg);
        color: var(--text);
    }

    :global(.modal-button) {
        font-size: var(--modal_button_size);
        width: max-content;
    }

    :global(.modal-center) {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        margin-right: 5px;
    }

    :global(.modal-center-no-overflow) {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
