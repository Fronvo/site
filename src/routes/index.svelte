<script context="module">
    export const prerender = true;
</script>

<script lang="ts">
    import Containers from '$lib/index/Containers.svelte';
    import Footer from '$lib/index/Footer.svelte';
    import Top from '$lib/index/Top.svelte';
    import TopNav from '$lib/index/TopNav.svelte';
    import { modalVisible } from 'stores/app/main';
    import { showLayout } from 'stores/global';
    import { indexAnimDuration, indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { sineOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';

    let mountReady = false;

    // Disable __layout in index
    $showLayout = false;

    // Default when accessed
    $indexVisible = true;

    // Remove modals if navigating back
    $modalVisible = false;

    onMount(() => {
        mountReady = true;
    });
</script>

<svelte:head>
    <title>Fronvo | Your Gateway to Free Conversations</title>
</svelte:head>

{#if mountReady}
    <TopNav />

    {#if $indexVisible}
        <div
            out:fade={{
                duration: indexAnimDuration,
                easing: sineOut,
            }}
        >
            <Top />

            <Containers />

            <Footer />
        </div>
    {/if}
{/if}
