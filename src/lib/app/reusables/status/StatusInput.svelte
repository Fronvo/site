<script lang="ts">
    import { ourData } from 'stores/profile';
    import { onMount } from 'svelte';
    import type { Writable } from 'svelte/store';

    let input: HTMLInputElement;

    export let status: Writable<string>;
    export let statusCallback: () => void;

    onMount(() => {
        if (input) {
            input.focus();

            input.onkeydown = (ev) => {
                if (ev.key == 'Enter') statusCallback();
            };
        }
    });
</script>

<div class="status-container">
    {#if $ourData.avatar}
        <img
            src={$ourData.avatar}
            alt={`${$ourData.avatar}\'s avatar'`}
            draggable={false}
        />
    {:else}
        <img src="/images/avatar.png" draggable={false} alt="Avatar" />
    {/if}

    <div class="secondary-container">
        <h1>{$ourData.username}</h1>
        <input bind:this={input} bind:value={$status} maxlength={20} />
    </div>
</div>

<style>
    .status-container {
        display: flex;
        align-items: center;
        width: 80%;
    }

    img {
        width: 48px;
        height: 48px;
        border-radius: 30px;
        margin-right: 5px;
    }

    .secondary-container {
        width: 80%;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .secondary-container h1 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 2px;
    }

    input {
        height: 40px;
        background: var(--primary);
        border: 2px solid transparent;
        font-size: 1.1rem;
        width: 100%;
        border-radius: 2px;
        padding-left: 10px;
        transition: 150ms;
        font-weight: 500;
    }

    input:focus {
        border: 2px solid var(--secondary);
    }
</style>
