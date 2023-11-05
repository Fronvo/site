<script lang="ts">
    import { indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { showLayout } from 'stores/main';
    import { goto } from '$app/navigation';
    import AppTopNav from '$lib/app/index/AppTopNav.svelte';
    import AppFooter from '$lib/app/index/AppFooter.svelte';
    import AppMobileProFinalMain from '$lib/app/index/AppMobileProFinalMain.svelte';

    let mountReady = false;

    onMount(async () => {
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

            <AppMobileProFinalMain />

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
