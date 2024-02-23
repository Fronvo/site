<script lang="ts">
    import { indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';
    import { cachedAccountData, showLayout } from 'stores/main';
    import { redirectApp } from 'utilities/index';
    import { performLogin } from 'utilities/main';
    import AppLoginMain from '$lib/app/index/AppLoginMain.svelte';

    let mountReady = false;

    onMount(async () => {
        // Remove for registered users
        if (getKey('token')) {
            redirectApp();

            await performLogin(getKey('token'), $cachedAccountData);
            return;
        }

        // Disable __layout in index
        $showLayout = false;

        // Default when accessed
        $indexVisible = true;

        mountReady = true;
    });
</script>

{#if mountReady}
    <div class="index-container">
        {#if $indexVisible}
            <AppLoginMain />
        {/if}
    </div>
{/if}

<style>
    .index-container {
        width: 100%;
        height: 100vh;
    }
</style>
