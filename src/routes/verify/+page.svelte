<script lang="ts">
    import { indexVisible, promotedToVerify } from 'stores/index';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';
    import { cachedAccountData, showLayout } from 'stores/main';
    import { redirectApp } from 'utilities/index';
    import { performLogin } from 'utilities/main';
    import { goto } from '$app/navigation';
    import AppVerifyMain from '$lib/app/index/AppVerifyMain.svelte';

    let mountReady = false;

    onMount(async () => {
        if (!$promotedToVerify) {
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
            <AppVerifyMain />
        {/if}
    </div>
{/if}

<style>
    .index-container {
        width: 100%;
        height: 100vh;
    }
</style>
