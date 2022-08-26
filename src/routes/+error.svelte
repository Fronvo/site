<script lang="ts">
    import Text from '$lib/__error/Text.svelte';
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import { page } from '$app/stores';

    let mountReady = false;

    onMount(() => {
        mountReady = true;
    });
</script>

{#if mountReady}
    <div class="error-container">
        <h1 in:slide id="status-code">{$page.status}</h1>

        <Text text="How did you get here, friend?" delay={3000} />
    </div>
{/if}

<style>
    .error-container {
        position: absolute;
        margin: auto;
        height: fit-content;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
    }

    .error-container #status-code {
        margin: 0;
        color: rgb(255, 109, 255);
        font-size: 6rem;
        margin-bottom: 10px;
    }

    @media screen and (max-width: 800px) {
        .error-container #status-code {
            font-size: 3rem;
        }
    }
</style>
