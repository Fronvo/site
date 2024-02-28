<script lang="ts">
    import { isMobile } from 'stores/main';
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

<div class={`status-container ${$isMobile ? 'mobile' : ''}`}>
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
        <input
            class="modal-input"
            bind:this={input}
            bind:value={$status}
            maxlength={20}
        />
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
        color: white;
    }

    input {
        height: 40px;
        border: 2px solid transparent;
        font-size: 1.1rem;
        width: 100%;
        border-radius: 2px;
        padding-left: 10px;
        transition: 150ms;
        font-weight: 500;
        padding-bottom: 2px;
        padding-top: 2px;
        margin-bottom: 0;
        margin-left: 2px;
    }

    input:focus {
        border: 2px solid white;
    }

    @media screen and (max-width: 850px) {
        .mobile {
            width: 90%;
        }

        .mobile img {
            width: 40px;
            height: 40px;
        }

        .mobile .secondary-container h1 {
            font-size: 0.9rem;
        }

        .mobile input {
            height: 35px;
            font-size: 0.9rem;
        }
    }
</style>
