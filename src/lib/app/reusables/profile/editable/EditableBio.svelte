<script lang="ts">
    import type { Writable } from 'svelte/store';

    export let bio: Writable<string>;
</script>

<div class="since-container">
    <h1 id="top">About me</h1>

    <textarea bind:value={$bio} maxlength={128} />
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
        font-size: 0.75rem;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 3px;
        color: white;
    }

    textarea {
        min-height: 100px;
        width: 95%;
        margin: 0;
        font-size: 0.85rem;
        margin-bottom: 10px;
        background: var(--primary);
        border: 2px solid transparent;
        transition: 150ms;
        font-weight: 600;
        color: white;
    }

    textarea:focus {
        border: 2px solid var(--secondary);
    }
</style>
