<script lang="ts" context="module">
    import { goto } from '$app/navigation';
    import type {
        ErrorLoadParams,
        ErrorLoadResult,
    } from 'src/interfaces/global';
    import Text from 'src/lib/__error/Text.svelte';
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
    <!-- TODO: Error svg, full screen 1920x1080 -->

    <div class="error-container">
        <h1 in:slide id="status-code">{status}</h1>

        <Text text="How did you get here, friend?" delay={3000} />

        <Text text="Let's get you back to safety!" delay={6000} />

        <button
            in:slide={{ delay: 9000, duration: 500 }}
            on:click={() => goto('/')}>Go back to safety</button
        >
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
        font-size: 5rem;
        margin-bottom: 10px;
    }

    .error-container button {
        font-size: 2.2rem;
        margin-top: 10px;
    }

    @media screen and (max-width: 800px) {
        .error-container #status-code {
            font-size: 3rem;
        }

        .error-container button {
            font-size: 1.2rem;
        }
    }
</style>
