<script lang="ts">
    import MainSideNav from '$lib/app/main/MainSideNav.svelte';
    import Modal from '$lib/app/main/Modal.svelte';
    import { currentPanelId, loginSucceeded, panels } from 'stores/app/main';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';

    onMount(() => {
        // Get latest panel id / Home
        $currentPanelId = getKey('panelId', 0);
    });
</script>

{#if $loginSucceeded}
    <!-- Smoothity-smooth modal auto-switching -->
    <Modal />

    <div class="main-container">
        <!-- TODO: Fronvo logo on desktop -->

        <!-- Side nav which transforms into a Top nav on mobile -->
        <MainSideNav />

        <!-- Reactive panel switching -->
        <svelte:component this={panels[$currentPanelId]} />
    </div>
{/if}

<style>
    @media screen and (max-width: 720px) {
        .main-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
    }
</style>
