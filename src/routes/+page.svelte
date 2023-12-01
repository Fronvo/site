<script lang="ts">
    import { indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { showLayout } from 'stores/main';
    import IndexMain from '$lib/index/IndexMain.svelte';
    import TopNav from '$lib/index/TopNav.svelte';
    import Footer from '$lib/index/Footer.svelte';
    import BlurredBackground from '$lib/index/BlurredBackground.svelte';

    let mountReady = false;

    onMount(async () => {
        // Disable __layout in index
        $showLayout = false;

        // Default when accessed
        $indexVisible = true;

        // Show the index page
        mountReady = true;
    });
</script>

{#if mountReady && $indexVisible}
    <div class="index-container">
        {#if $indexVisible}
            <BlurredBackground />

            <TopNav />

            <IndexMain />

            <Footer />
        {/if}
    </div>
{/if}

<style>
    .index-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        overflow: auto;
    }
</style>
