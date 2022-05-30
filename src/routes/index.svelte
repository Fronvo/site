<script context="module">
    export const prerender = true;
</script>

<script lang="ts">
    import Containers from 'src/lib/index/Containers.svelte';
    import Footer from 'src/lib/index/Footer.svelte';
    import Top from 'src/lib/index/Top.svelte';
    import { onMount } from 'svelte';

    let mountReady = false;
    let revealContent = false;

    onMount(() => {
        mountReady = true;

        setTimeout(() => {
            revealContent = true;
        }, 2400);
    });
</script>

<svelte:head>
    <title>Fronvo | Your Gateway to Free Conversations</title>
</svelte:head>

{#if mountReady}
    <Top />

    {#if revealContent}
        <Containers />

        <Footer />
    {/if}
{/if}
