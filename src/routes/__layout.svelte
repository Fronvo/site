<script lang="ts">
    import Account from '$lib/app/account/Account.svelte';
    import Main from '$lib/app/main/Main.svelte';
    import { tokenInvalid } from 'stores/app/global';
    import { loginSucceeded } from 'stores/app/main';
    import { initSocket, showLayout } from 'stores/global';
    import { onMount } from 'svelte';
    import themingVariables from 'svelte-css-vars';
    import { setGlobalOptions } from 'svelte-scrolling';
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { performLogin } from 'utilities/app/main';
    import { getKey } from 'utilities/global';
    import '../app.css';
    import { currentTheme } from '../themes';

    let mountReady = false;

    onMount(() => {
        mountReady = true;
    });

    // svelte-scrolling globals
    setGlobalOptions({
        duration: 750,
        easing: sineInOut,
        offset: 0,
    });

    // When layout is visible, perform socket actions
    showLayout.subscribe((state) => {
        if (state) {
            // Init, login (will return if already called from index, only placed for direct route access)
            initSocket(performLogin);
        }
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
