<script lang="ts">
    import { indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';
    import { cachedAccountData, currentToken, showLayout } from 'stores/main';
    import { redirectApp } from 'utilities/index';
    import { performLogin } from 'utilities/main';
    import AppRegisterMain from '$lib/app/index/AppRegisterMain.svelte';

    let mountReady = false;

    onMount(async () => {
        if (getKey('token')) {
            redirectApp();

            $currentToken = getKey('token');

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

{#if mountReady}
    <div class="index-container">
        {#if $indexVisible}
            <AppRegisterMain />
        {/if}
    </div>
{/if}

<style>
    .index-container {
        width: 100%;
        height: 100vh;
    }
</style>
