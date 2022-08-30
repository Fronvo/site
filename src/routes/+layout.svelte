<script lang="ts">
    import Account from '$lib/app/account/Account.svelte';
    import Main from '$lib/app/main/Main.svelte';
    import { ModalTypes } from 'types/app/main';
    import { tokenInvalid } from 'stores/app/global';
    import {
        currentModalId,
        loginSucceeded,
        modalVisible,
    } from 'stores/app/main';
    import {
        initSocket,
        sessionAttached,
        sessionTime,
        sessionTimeEnabled,
        sessionWarningShown,
        showLayout,
    } from 'stores/global';
    import { onMount } from 'svelte';
    import themingVariables from 'svelte-css-vars';
    import { setGlobalOptions } from 'svelte-scrolling';
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { performLogin, showModal } from 'utilities/app/main';
    import { getKey } from 'utilities/global';
    import '../app.css';
    import { currentTheme } from '../themes';

    let mountReady = false;

    onMount(() => {
        mountReady = true;

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
    });

    // svelte-scrolling globals
    setGlobalOptions({
        duration: 750,
        easing: sineInOut,
        offset: 0,
    });
</script>

<div class="main" use:themingVariables={$currentTheme}>
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
