<script lang="ts">
    import { isMobile } from 'stores/main';
    import Time from 'svelte-time/src/Time.svelte';

    export let since: string;
</script>

<div class={`since-container ${$isMobile ? 'mobile' : ''}`}>
    <h1 id="top">Fronvo member since</h1>

    <h1 id="since"><Time timestamp={since} /></h1>
</div>

<style>
    .since-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-left: 20px;
    }

    .since-container #top {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 3px;
        color: var(--text);
    }

    .since-container #since {
        margin: 0;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--text);
    }

    @media screen and (max-width: 850px) {
        .mobile #top {
            font-size: 0.7rem;
        }

        .mobile #since {
            font-size: 0.75rem;
        }
    }
</style>
