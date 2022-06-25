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
        <MainSideNav />

        <!-- Reactive panel switching -->
        <svelte:component this={panels[$currentPanelId]} />
    </div>
{/if}

<style>
    .main-container {
        position: absolute;
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
    }

    @media screen and (max-width: 700px) {
        .main-container {
            flex-direction: column;
        }
    }
</style>
