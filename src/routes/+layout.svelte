<script lang="ts">
    import Account from '$lib/app/account/Account.svelte';
    import Main from '$lib/app/main/Main.svelte';
    import { dataSaver, tokenInvalid } from 'stores/all';
    import {
        dropdownPosition,
        loginSucceeded,
        modalVisible,
    } from 'stores/main';
    import {
        darkTheme,
        initSocket,
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

        darkTheme.subscribe((dark) => {
            if (typeof dark == 'undefined') {
                return;
            }

            currentTheme.set(dark ? defaultTheme : whiteTheme);
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
                // Init, login (will return if already called from index, only placed for direct route access)
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
    });
</script>

<div class="main" use:themingVars={{ ...$currentTheme }}>
    {#if mountReady}
        {#if $showLayout}
            <div in:fade={{ duration: 500 }}>
                {#if (getKey('token') || $loginSucceeded) && !$tokenInvalid}
                    <Main />
                {:else}
                    <Account />
                {/if}
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

    /* Not needed on desktop with mobile width */
    @media screen and (max-width: 720px) {
        :global(::-webkit-scrollbar) {
            width: 0px;
        }
    }
</style>
