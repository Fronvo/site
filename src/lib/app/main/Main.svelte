<script lang="ts">
    import Loading from '$lib/app/Loading.svelte';
    import MainTopNav from '$lib/app/main/MainTopNav.svelte';
    import { getKey } from 'src/utilities/global';
    import { showHomeLoadingDelay } from 'stores/app/global';
    import { currentPanelId, loginSucceeded, panels } from 'stores/app/main';
    import { onMount } from 'svelte';
    import { performLogin } from 'utilities/app/main';

    let showLoading = false;

    onMount(() => {
        performLogin();

        // Get latest panel id / Home
        $currentPanelId = getKey('panelId', 0);
    });

    // Show loading after delay
    setTimeout(() => {
        showLoading = true;
    }, showHomeLoadingDelay);
</script>

<svelte:head>
    <title>Fronvo</title>
</svelte:head>

{#if !$loginSucceeded}
    {#if showLoading}
        <Loading text="Loading Fronvo..." />
    {/if}
{:else}
    <MainTopNav />

    <!-- Reactive panel switching -->
    <svelte:component this={panels[$currentPanelId]} />
{/if}
