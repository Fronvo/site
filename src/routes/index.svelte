<script context="module">
    export const prerender = true;
</script>

<script lang="ts">
    import Saos from 'saos';
    import Github from 'src/lib/svgs/Github.svelte';
    import Wave from 'src/lib/svgs/Wave.svelte';
    import { customScrollDuration } from 'src/stores';
    import 'styles/index.css';
    import { onMount } from 'svelte';
    import { scrollRef, scrollTo, setGlobalOptions } from 'svelte-scrolling';
    import { cubicOut, sineInOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';

    let mountReady = false,
        SAOSReady = false;

    // Only show animatable content when top animations are done
    const delayForSAOS = 2300;

    onMount(() => {
        mountReady = true;
        setTimeout(() => (SAOSReady = true), delayForSAOS);
    });

    // Global scroll options for svelte-scrolling
    setGlobalOptions({
        duration: customScrollDuration,
        easing: sineInOut,
        offset: 0,
    });
</script>

<svelte:head>
    <title>Fronvo | Your Gateway to Free Conversations</title>
</svelte:head>

{#if mountReady}
    <div out:fade={{ duration: 750 }}>
        <div class="top-container">
            <Wave />

            <h1
                id="logo-title"
                in:fly={{ duration: 500, y: 50, easing: cubicOut }}
            >
                Fronvo
            </h1>

            <p
                id="logo-descriptor"
                in:fly={{ duration: 600, y: 25, delay: 750, easing: cubicOut }}
            >
                The next-generation social media app, tailored for you.
            </p>

            <button
                in:fly={{ duration: 600, y: 25, delay: 1400, easing: cubicOut }}
                on:click={() =>
                    (location.href = 'https://github.com/Fronvo/site')}
                style="margin-bottom: 20px;">Try it online</button
            >

            <div
                id="down-arrow-container"
                use:scrollTo={'fronvo-safe'}
                in:fly={{ duration: 300, y: 10, delay: 1900, easing: cubicOut }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={'48px'}
                    height={'48px'}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather-icon"
                    ><polyline points="6 9 12 15 18 9" /></svg
                >
            </div>
        </div>

        {#if SAOSReady}
            <div class="saos-content">
                <div
                    class="container"
                    id="colored"
                    use:scrollRef={'fronvo-safe'}
                    in:fade={{ duration: 500 }}
                >
                    <Saos
                        once={true}
                        animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
                    >
                        <h1>The gateway to truly free conversations</h1>

                        <div id="content">
                            <h1>
                                Where your data is safer than anywhere else.
                            </h1>
                        </div>
                    </Saos>
                </div>

                <div
                    class="container"
                    use:scrollRef={'fronvo-features'}
                    in:fade={{ duration: 500 }}
                >
                    <Saos
                        once={true}
                        animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
                    >
                        <h1>With no lack of features</h1>

                        <div id="content">
                            <h1>
                                Communities, Theme Marketplace, User Creations.
                                You name it, we got it.
                            </h1>
                        </div>
                    </Saos>
                </div>

                <div
                    class="container"
                    id="colored"
                    use:scrollRef={'fronvo-quirks'}
                    in:fade={{ duration: 500 }}
                >
                    <Saos
                        once={true}
                        animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
                    >
                        <h1>No quirks, no fees</h1>

                        <div id="content">
                            <h1>Your own platform, on your own hands.</h1>
                        </div>
                    </Saos>
                </div>

                <div
                    class="container last-container"
                    use:scrollRef={'fronvo-join'}
                    in:fade={{ duration: 500 }}
                >
                    <Saos
                        once={true}
                        animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
                    >
                        <h1>Join the Fronvo Community</h1>

                        <div id="content">
                            <button
                                on:click={() =>
                                    (location.href =
                                        'https://github.com/Fronvo/site')}
                                >Try Fronvo online</button
                            >
                        </div>
                    </Saos>
                </div>
            </div>

            <div class="footer">
                <Wave inverse />

                <div id="content">
                    <h1>Fronvo</h1>

                    <Github
                        on:click={() =>
                            (location.href = 'https://github.com/fronvo/site')}
                    />
                </div>
            </div>
        {/if}
    </div>
{/if}

<style>
    /* For SAOS, animation on scroll */
    @keyframes -global-slide-top {
        0% {
            transform: translateY(75px);
        }

        100% {
            transform: translateY(0);
        }
    }
</style>
