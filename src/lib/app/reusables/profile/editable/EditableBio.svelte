<script lang="ts">
    import { isMobile } from 'stores/main';
    import type { Writable } from 'svelte/store';

    export let bio: Writable<string>;
</script>

<div class={`since-container ${$isMobile ? 'mobile' : ''}`}>
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
        color: var(--text);
    }

    textarea {
        min-height: 100px;
        width: 95%;
        margin: 0;
        font-size: 0.85rem;
        margin-bottom: 10px;
        background: var(--secondary);
        border: 2px solid transparent;
        transition: 150ms;
        font-weight: 500;
        color: var(--text);
    }

    textarea:focus {
        border: 2px solid var(--text);
    }

    @media screen and (max-width: 850px) {
        .mobile #top {
            font-size: 0.7rem;
        }

        .mobile textarea {
            min-height: 150px;
            font-size: 0.75rem;
        }
    }
</style>
