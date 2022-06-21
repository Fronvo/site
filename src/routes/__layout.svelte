<script lang="ts">
    import Account from '$lib/app/account/Account.svelte';
    import Main from '$lib/app/main/Main.svelte';
    import { hasLoggedIn, tokenInvalid } from 'stores/app/global';
    import { initSocket, showLayout } from 'stores/global';
    import { onMount } from 'svelte';
    import { setGlobalOptions } from 'svelte-scrolling';
    import { ThemeWrapper } from 'svelte-themer';
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { performLogin } from 'utilities/app/main';
    import { getKey } from 'utilities/global';
    import '../app.css';
    import themes from '../themes';

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

<ThemeWrapper mode="dark" {themes}>
    {#if mountReady}
        {#if $showLayout}
            <div in:fade={{ duration: 500 }} out:fade>
                {#if (getKey('token') || $hasLoggedIn) && !$tokenInvalid}
                    <Main />
                {:else}
                    <Account />
                {/if}
            </div>
        {/if}

        <slot />
    {/if}
</ThemeWrapper>
