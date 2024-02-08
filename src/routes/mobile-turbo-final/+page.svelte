<script lang="ts">
    import { indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { currentToken, showLayout } from 'stores/main';
    import { goto } from '$app/navigation';
    import AppMobileTurboFinalMain from '$lib/app/index/AppMobileTurboFinalMain.svelte';

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
            <AppMobileTurboFinalMain />
        {/if}
    </div>
{/if}

<style>
    .mobile-container {
        width: 100%;
        height: 690px;
        padding-bottom: 20px;
        overflow: auto;
    }
</style>
