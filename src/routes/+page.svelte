<script lang="ts">
    import TopNav from '$lib/index/TopNav.svelte';
    import { indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';
    import { cachedAccountData, currentToken, showLayout } from 'stores/main';
    import Footer from '$lib/index/Footer.svelte';
    import IndexMain from '$lib/index/IndexMain.svelte';
    import { redirectApp } from 'utilities/index';
    import { performLogin } from 'utilities/main';

    let mountReady = false;

    onMount(async () => {
        // Remove homepage for registered users
        if (getKey('token')) {
            const val = window.navigator.userAgent.toLowerCase();

            // Block access to mobile, get the app
            if (!(val.includes('android') || val.includes('iphone'))) {
                redirectApp();

                $currentToken = getKey('token');

                await performLogin(getKey('token'), $cachedAccountData);
                return;
            }
        }

        // Disable __layout in index
        $showLayout = false;

        // Default when accessed
        $indexVisible = true;

        // Show the index page
        mountReady = true;
    });
</script>

{#if mountReady && $indexVisible}
    <div class="index-container">
        {#if $indexVisible}
            <TopNav />

            <IndexMain />

            <Footer />
        {/if}
    </div>
{/if}

<style>
    .index-container {
        width: 100%;
        height: 100vh;
    }
</style>
