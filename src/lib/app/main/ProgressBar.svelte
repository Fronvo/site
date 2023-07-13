<script lang="ts">
    import { progressBarVisible } from 'stores/main';
    import { slide } from 'svelte/transition';
</script>

{#if $progressBarVisible}
    <div transition:slide={{ duration: 250 }} class="progress" />
{/if}

<style>
    .progress {
        position: fixed;
        padding: 5px;
        width: 100%;
        z-index: 100;
        background: var(--branding);
        box-shadow: 0 0 10px var(--branding);
    }
</style>
