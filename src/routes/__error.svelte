<script lang="ts" context="module">
    import Text from '$lib/__error/Text.svelte';
    import type { ErrorLoadParams, ErrorLoadResult } from 'interfaces/global';
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';

    export function load({ status, error }: ErrorLoadParams): ErrorLoadResult {
        return {
            props: {
                status,
                error: error.message,
            },
        };
    }
</script>

<script lang="ts">
    let mountReady = false;
    export let status: number;

    onMount(() => {
        mountReady = true;
    });
</script>

{#if mountReady}
    <div class="error-container">
        <h1 in:slide id="status-code">{status}</h1>

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
