<script context="module">
    export const prerender = true;
</script>

<script lang="ts">
    import Containers from 'src/lib/index/Containers.svelte';
    import Footer from 'src/lib/index/Footer.svelte';
    import Top from 'src/lib/index/Top.svelte';
    import TopNav from 'src/lib/index/TopNav.svelte';
    import TryItButton from 'src/lib/index/TryItButton.svelte';
    import { onMount } from 'svelte';

    let mountReady = false;

    onMount(() => {
        mountReady = true;
    });
</script>

<svelte:head>
    <title>Fronvo | Your Gateway to Free Conversations</title>
</svelte:head>

{#if mountReady}
    <TopNav />

    <Top />

    <Containers />

    <TryItButton />

    <Footer />
{/if}
