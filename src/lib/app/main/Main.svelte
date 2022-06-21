<script lang="ts">
    import Loading from '$lib/app/Loading.svelte';
    import MainSideNav from '$lib/app/main/MainSideNav.svelte';
    import Modal from '$lib/app/main/Modal.svelte';
    import { showHomeLoadingDelay } from 'stores/app/global';
    import { currentPanelId, loginSucceeded, panels } from 'stores/app/main';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';

    let showLoading = false;

    onMount(() => {
        // Get latest panel id / Home
        $currentPanelId = getKey('panelId', 0);
    });

    // Show loading after delay
    setTimeout(() => {
        showLoading = true;
    }, showHomeLoadingDelay);
</script>

{#if !$loginSucceeded}
    {#if showLoading}
        <Loading text="Loading Fronvo..." />
    {/if}
{:else}
    <!-- Smoothity-smooth modal auto-switching -->
    <Modal />

    <div class="main-container">
        <MainSideNav />

        <!-- Reactive panel switching -->
        <svelte:component this={panels[$currentPanelId]} />
    </div>
{/if}

<style>
    .main-container {
        position: absolute;
        display: flex;
        height: 100%;
        width: 100%;
    }

    @media screen and (max-width: 700px) {
        .main-container {
            display: block;
        }
    }
</style>
