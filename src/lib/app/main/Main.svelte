<script lang="ts">
    import MainSideNav from '$lib/app/main/MainSideNav.svelte';
    import Modal from '$lib/app/main/Modal.svelte';
    import { currentPanelId, loginSucceeded, panels } from 'stores/app/main';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';
    import Dropdown from './Dropdown.svelte';

    onMount(() => {
        // Get latest panel id / Home
        $currentPanelId = getKey('panelId', 0);
    });
</script>

{#if $loginSucceeded}
    <!-- Smoothity-smooth modal auto-switching -->
    <Modal />

    <!-- Smoothity-smooth dropdown auto-switching -->
    <Dropdown />

    <div class="main-container">
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
            height: max-content;
        }
    }
</style>
