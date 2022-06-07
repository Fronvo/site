<script context="module">
    export const prerender = true;
</script>

<script lang="ts">
    import Containers from '$lib/index/Containers.svelte';
    import Footer from '$lib/index/Footer.svelte';
    import Top from '$lib/index/Top.svelte';
    import TopNav from '$lib/index/TopNav.svelte';
    import TryItButton from '$lib/index/TryItButton.svelte';
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
