<script lang="ts">
    import TopNav from '$lib/index/TopNav.svelte';
    import { indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { showLayout } from 'stores/main';
    import Footer from '$lib/index/Footer.svelte';
    import { goto } from '$app/navigation';
    import MobileProMain from '$lib/index/MobileProMain.svelte';

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
            <TopNav />

            <MobileProMain />

            <Footer />
        {/if}
    </div>
{/if}

<style>
    .mobile-container {
        width: 100%;
        height: 100vh;
    }
</style>
