<script lang="ts">
    import { indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { currentToken, showLayout } from 'stores/main';
    import { goto } from '$app/navigation';
    import MobileProWelcomeMain from '$lib/app/index/AppMobileProWelcomeMain.svelte';
    import AppTopNav from '$lib/app/index/AppTopNav.svelte';
    import AppFooter from '$lib/app/index/AppFooter.svelte';

    let mountReady = false;

    onMount(async () => {
        if (!$currentToken) {
            goto('/', {
                replaceState: true,
            });
        }

        const val = window.navigator.userAgent.toLowerCase();

        if (!(val.includes('android') || val.includes('iphone'))) {
            goto('/', {
                replaceState: true,
            });
        }

        $showLayout = false;
        $indexVisible = true;
        mountReady = true;
    });
</script>

{#if mountReady && $indexVisible}
    <div class="mobile-container">
        {#if $indexVisible}
            <AppTopNav />

            <MobileProWelcomeMain />

            <AppFooter />
        {/if}
    </div>
{/if}

<style>
    .mobile-container {
        width: 100%;
        height: 100vh;
    }
</style>
