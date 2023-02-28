<script lang="ts">
    import Main from '$lib/app/main/Main.svelte';
    import { onMount } from 'svelte';
    import themingVars from 'svelte-css-vars';
    import {
        dismissDropdown,
        dismissModal,
        initSocket,
        performLogin,
        setTitle,
    } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import '../app.css';
    import { currentTheme, defaultTheme, whiteTheme } from '../themes';
    import FronvoLoading from '$lib/app/FronvoLoading.svelte';
    import { fade } from 'svelte/transition';
    import {
        cachedAccountData,
        darkTheme,
        dataSaver,
        fronvoTitle,
        guestMode,
        showLayout,
        xmasMode,
        xmasParticleOptions,
    } from 'stores/main';
    import { pendingSearchId } from 'stores/profile';
    import { dropdownPosition } from 'stores/dropdowns';
    import { shiftHeld } from 'stores/actions';
    import { currentPanelId } from 'stores/panels';

    let mountReady = false;

    function setupVars(): void {
        // Try our best to default to dark
        $darkTheme = !getKey('darkTheme') || getKey('darkTheme') == 'true';
        $dataSaver = getKey('dataSaver') == 'true';
        $xmasMode =
            new Date().getMonth() == 11 &&
            (!getKey('xmasMode') || getKey('xmasMode') == 'true');
    }

    function setupTheming(): void {
        darkTheme.subscribe((dark) => {
            if (typeof dark == 'undefined') {
                return;
            }

            currentTheme.set(dark ? defaultTheme : whiteTheme);

            // Update XMAS particles, regardless of current state
            $xmasParticleOptions.particles.color.value = dark
                ? '#ffffff'
                : '#cccccc';
        });
    }

    function setupLayout(): void {
        // When layout is visible, perform socket actions
        showLayout.subscribe(async (state) => {
            // While loading, default to this
            setTitle('Fronvo');

            if (state) {
                // Init regardless of login state
                initSocket(async () => {
                    await performLogin($pendingSearchId, $cachedAccountData);

                    // May have reconnected with an open modal
                    dismissModal();
                });
            }
        });
    }

    function setupListeners(): void {
        document.addEventListener('mousedown', (ev) => {
            dropdownPosition.set([
                Math.min(ev.clientX, window.innerWidth - 215),
                Math.min(ev.clientY, window.innerHeight - 175),
            ]);
        });

        document.addEventListener('keydown', (ev) => {
            if (ev.shiftKey) {
                $shiftHeld = true;
            }

            if (ev.key == 'Escape') {
                dismissModal();
                dismissDropdown();
            }
        });

        document.addEventListener('keyup', (ev) => {
            if (ev.key == 'Shift') {
                $shiftHeld = false;
            }
        });
    }

    function setupOther(): void {
        // Reset scroll
        currentPanelId.subscribe(() => {
            document.getElementsByClassName('main')[0].scrollTo(0, 0);
        });
    }

    onMount(() => {
        mountReady = true;

        setupVars();
        setupTheming();
        setupLayout();
        setupListeners();
        setupOther();
    });
</script>

<svelte:head>
    <title>{$fronvoTitle}</title>
</svelte:head>

<div class="main" use:themingVars={{ ...$currentTheme }}>
    {#if mountReady}
        {#if $showLayout}
            {#if $guestMode == undefined}
                <div out:fade={{ duration: 500 }}>
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
    .main {
        padding: 0;
        margin: 0;
        position: fixed;
        height: 100vh;
        width: 100%;
        background: var(--bg_color);
        overflow: auto;
        transition: 300ms background;
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
        color: var(--text_color);
    }

    /* Modal-related */
    :global(.modal-header) {
        color: var(--profile_info_color);
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
        text-align: center;
        background: var(--modal_input_bg_color);
    }

    :global(.modal-button) {
        font-size: var(--modal_button_size);
        width: max-content;
    }

    :global(.modal-center) {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.modal-center-no-overflow) {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    @media screen and (max-width: 700px) {
        /* Not needed on desktop with mobile width */
        :global(::-webkit-scrollbar) {
            width: 0px;
        }

        :global(.modal-header) {
            font-size: var(--modal_header_size_700);
        }

        :global(.modal-input) {
            font-size: var(--modal_input_size_700);
            width: 250px;
        }

        :global(.modal-button) {
            font-size: var(--modal_button_size_700);
        }
    }
</style>
