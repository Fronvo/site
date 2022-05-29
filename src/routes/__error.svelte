<script lang="ts" context="module">
    import { goto } from '$app/navigation';
    import type {
        ErrorLoadParams,
        ErrorLoadResult,
    } from 'src/interfaces/global';
    import 'styles/__error.css';
    import { onMount } from 'svelte';
    import TypeWriter from 'svelte-typewriter';
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

        <TypeWriter delay={3000} interval={60} cursor={'#f0f0f0'}>
            <h1>How did you get here, friend?</h1>
        </TypeWriter>

        <TypeWriter delay={6000} interval={60} cursor={'#f0f0f0'}>
            <h1>Let's get you back to safety!</h1>
        </TypeWriter>

        <button
            in:slide={{ delay: 9000, duration: 500 }}
            on:click={() => goto('/')}>Go back to safety</button
        >
    </div>
{/if}
