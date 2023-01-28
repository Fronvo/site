<script lang="ts">
    import Main from '$lib/app/main/Main.svelte';
    import {
        dataSaver,
        fronvoTitle,
        xmasParticleOptions,
        xmasMode,
        initSocket,
    } from 'stores/all';
    import {
        currentPanelId,
        dropdownPosition,
        loginSucceeded,
        modalVisible,
    } from 'stores/main';
    import {
        darkTheme,
        sessionAttached,
        sessionTime,
        sessionTimeEnabled,
        sessionWarningShown,
        showLayout,
    } from 'stores/all';
    import { onMount } from 'svelte';
    import themingVars from 'svelte-css-vars';
    import { fade } from 'svelte/transition';
    import { ModalTypes } from 'types/main';
    import { performLogin, showModal } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import '../app.css';
    import { currentTheme, defaultTheme, whiteTheme } from '../themes';

    let mountReady = false;

    onMount(() => {
        mountReady = true;

        // Try our best to default to dark
        $darkTheme = !getKey('darkTheme') || getKey('darkTheme') == 'true';
        $dataSaver = getKey('dataSaver') == 'true';
        $xmasMode =
            new Date().getMonth() == 11 &&
            (!getKey('xmasMode') || getKey('xmasMode') == 'true');

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

        function startSessionTime(): void {
            // Also start the max online time counter
            // Session time
            if ($sessionAttached) return;

            $sessionAttached = true;

            if (getKey('maxOnlineTime') && $showLayout) {
                setInterval(() => {
                    if (!$showLayout || !$sessionTimeEnabled) {
                        $sessionTime = 0;
                        return;
                    }

                    if (!$modalVisible) {
                        $sessionTime += 1;
                    }

                    // Observer, check state again
                    if (getKey('maxOnlineTime')) {
                        if (
                            $sessionTime >= getKey('maxOnlineTime') &&
                            !$sessionWarningShown
                        ) {
                            // Set stats info
                            $sessionWarningShown = true;

                            showModal(ModalTypes.MaxOnlineTime);
                        }
                    }
                }, 1000);
            }
        }

        // When layout is visible, perform socket actions
        showLayout.subscribe((state) => {
            if (state) {
                // Init regardless of login state
                initSocket(performLogin);

                if (getKey('maxOnlineTime')) {
                    $sessionTimeEnabled = true;
                }
            } else {
                // Reset session warning
                $sessionWarningShown = false;
            }
        });

        sessionTimeEnabled.subscribe((state) => {
            if (!state) return;

            startSessionTime();
        });

        document.addEventListener('mousemove', (ev) => {
            dropdownPosition.set([
                Math.min(ev.clientX, window.innerWidth - 150),
                ev.clientY,
            ]);
        });

        // Reset scroll
        currentPanelId.subscribe(() => {
            document.getElementsByClassName('main')[0].scrollTo(0, 0);
        });
    });
</script>

<svelte:head>
    <title>{$fronvoTitle}</title>
</svelte:head>

<div class="main" use:themingVars={{ ...$currentTheme }}>
    {#if mountReady}
        {#if $showLayout && $loginSucceeded != undefined}
            <div in:fade={{ duration: 500 }}>
                <Main />
            </div>
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
    }

    /* Elegant theme feature */
    :global(#blur) {
        backdrop-filter: blur(3px);
        background: none;
    }

    /* Not needed on desktop with mobile width */
    @media screen and (max-width: 720px) {
        :global(::-webkit-scrollbar) {
            width: 0px;
        }
    }
</style>
