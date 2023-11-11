<script lang="ts">
    import { ourData } from 'stores/profile';

    export let title: string;
    export let creating = false;
</script>

<div class={`identifier-container ${creating ? 'creating' : ''}`}>
    {#if !creating}
        <h1 id="title">{title}</h1>
    {:else}
        <input
            class={`${$ourData.appliedTheme ? 'themed' : ''}`}
            placeholder="Title"
            maxlength={20}
            bind:value={title}
        />
    {/if}
</div>

<style>
    .identifier-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 20px;
        margin-top: 10px;
    }

    #title {
        font-size: 1.5rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        color: var(--text);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-weight: 600;
    }

    input {
        background: var(--modal_input_bg);
        border: 2px solid var(--modal_input_bg);
        transition: 150ms border;
        font-size: 1.3rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        margin-top: 5px;
        margin-bottom: 10px;
        color: var(--text);
        height: 40px;
    }

    input:focus {
        border: 2px solid var(--pro);
    }

    .themed:focus {
        border: 2px solid var(--branding);
    }
</style>
