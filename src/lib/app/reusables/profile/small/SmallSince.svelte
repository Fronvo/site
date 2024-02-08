<script lang="ts">
    import Time from 'svelte-time/src/Time.svelte';

    export let since: string;
</script>

<div class="since-container">
    <h1 id="top">Fronvo member since</h1>

    <h1 id="since"><Time timestamp={since} /></h1>
</div>

<style>
    .since-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-left: 15px;
    }

    .since-container #top {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 3px;
    }

    .since-container #since {
        margin: 0;
        font-size: 0.85rem;
        margin-bottom: 10px;
    }
</style>
