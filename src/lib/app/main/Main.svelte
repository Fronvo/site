<script lang="ts">
    import MainSideNav from '$lib/app/main/MainSideNav.svelte';
    import Modal from '$lib/app/main/Modal.svelte';
    import { currentPanelId, loginSucceeded, panels } from 'stores/main';
    import { onMount } from 'svelte';
    import { getKey } from 'utilities/global';
    import Dropdown from './Dropdown.svelte';
    import { particleOptions, xmasMode } from 'stores/all';

    let ParticlesComponent: any;

    onMount(async () => {
        // Get latest panel id / Home
        $currentPanelId = getKey('panelId', 0);

        const module = await import('svelte-particles');
        ParticlesComponent = module.default;
    });
</script>

{#if $loginSucceeded}
    {#if $xmasMode}
        <svelte:component
            this={ParticlesComponent}
            id="tsparticles"
            options={particleOptions}
        />
    {/if}

    <!-- Smoothity-smooth modal auto-switching -->
    <Modal />

    <!-- Smoothity-smooth dropdown auto-switching -->
    <Dropdown />

    <div class="main-container">
        <!-- Side nav which transforms into a Top nav on mobile -->
        <MainSideNav />

        <div id="content">
            <!-- Reactive panel switching -->
            <svelte:component this={panels[$currentPanelId]} />
        </div>
    </div>
{/if}

<style>
    .main-container {
        display: flex;
        flex-direction: row;
    }

    #content {
        width: 100%;
        justify-content: center;
    }

    @media screen and (max-width: 520px) {
        .main-container {
            flex-direction: column;
        }
    }
</style>
