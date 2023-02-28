<script lang="ts">
    import Containers from '$lib/index/Containers.svelte';
    import Footer from '$lib/index/Footer.svelte';
    import Top from '$lib/index/Top.svelte';
    import TopNav from '$lib/index/TopNav.svelte';
    import { indexAnimDuration, indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { sineOut } from 'svelte/easing';
    import { fade, scale } from 'svelte/transition';
    import { dismissModal, setTitle } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import { showLayout } from 'stores/main';

    let mountReady = false;

    onMount(() => {
        // Remove homepage for registered users
        if (getKey('token')) {
            $showLayout = true;
            return;
        }

        setTitle('Fronvo, Your Gateway to Free Conversations');

        // Remove modals if navigating back
        dismissModal();

        // Disable __layout in index
        $showLayout = false;

        // Default when accessed
        $indexVisible = true;

        // Show the index page
        mountReady = true;
    });
</script>

{#if mountReady && $indexVisible}
    <div
        class="scrolling-bg"
        in:scale={{ start: 0.95, duration: 500, opacity: 0.9 }}
        out:fade={{ duration: indexAnimDuration }}
    >
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
    </div>
{/if}

<style>
    .scrolling-bg {
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: fit-content;
        z-index: 1;
        background: url(/images/fronvo-landing-scroll-bg.svg) no-repeat center
            center scroll;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
