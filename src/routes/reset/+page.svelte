<script lang="ts">
    import { indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';
    import { cachedAccountData, showLayout } from 'stores/main';
    import AppResetMain from '$lib/app/index/AppResetMain.svelte';
    import { redirectApp } from 'utilities/index';
    import { performLogin } from 'utilities/main';
    import { goto } from '$app/navigation';
    import BlurredBackground2 from '$lib/index/BlurredBackground2.svelte';

    let mountReady = false;

    onMount(async () => {
        // No mobile
        const val = window.navigator.userAgent.toLowerCase();

        // Block access to mobile, get the app
        if (val.includes('android') || val.includes('iphone')) {
            goto('/', {
                replaceState: true,
            });

            return;
        }

        // Remove for registered users
        if (getKey('token')) {
            redirectApp();

            goto('/', {
                replaceState: true,
            });

            await performLogin(getKey('token'), $cachedAccountData);
            return;
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
            <AppResetMain />

            <BlurredBackground2 />
        {/if}
    </div>
{/if}

<style>
    .index-container {
        width: 100%;
        height: 100vh;
    }
</style>
