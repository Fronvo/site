<script lang="ts">
    import MainSideNav from '$lib/app/main/MainSideNav.svelte';
    import Modal from '$lib/app/main/Modal.svelte';
    import { currentPanelId, panels, PanelTypes } from 'stores/panels';
    import { onMount } from 'svelte';
    import Dropdown from './Dropdown.svelte';
    import { xmasParticleOptions, xmasMode } from 'stores/main';
    import ProgressBar from './ProgressBar.svelte';
    import CommunityMembers from './panels/community/CommunityMembers.svelte';
    import { memberListVisible } from 'stores/community';

    let ParticlesComponent: any;

    onMount(async () => {
        const module = await import('svelte-particles');
        ParticlesComponent = module.default;
    });
</script>

{#if $xmasMode}
    <svelte:component
        this={ParticlesComponent}
        id="tsparticles"
        options={$xmasParticleOptions}
    />
{/if}

<!-- Loading indicator -->
<ProgressBar />

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

    {#if $currentPanelId == PanelTypes.Community && $memberListVisible}
        <CommunityMembers />
    {/if}
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
    }

    #content {
        width: 100%;
        justify-content: start;
    }

    @media screen and (max-width: 850px) {
        .main-container {
            flex-direction: column-reverse;
        }
    }
</style>
