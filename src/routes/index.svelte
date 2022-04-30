<svelte:head>
    <title>Fronvo | Your Gateway to Free Conversations</title>
</svelte:head>

<script context='module'>
    export const ssr = false;
    export const prerender = true;
</script>

<script lang='ts'>
    import 'styles/homepage.css';

    import Saos from 'saos';
    import { onMount } from 'svelte';
    import { ChevronDownIcon } from 'svelte-feather-icons';
    import { scrollRef, scrollTo, setGlobalOptions } from 'svelte-scrolling';
    import { cubicOut, sineInOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';
    import { customScrollDuration } from 'src/stores';

    let mountReady = false, SAOSReady = false;

    // Only show animatable content when top animations are done
    const delayForSAOS = 2300;

    onMount(() => {
        mountReady = true;
        setTimeout(() => SAOSReady = true, delayForSAOS);
    });

    // Global scroll options for svelte-scrolling
    setGlobalOptions({
        duration: customScrollDuration,
        easing: sineInOut,
        offset: 0
    });

</script>

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

{#if mountReady}

<div out:fade={{duration: 750}}>

    <div class='top-container'>

        <!-- Get them wavez! -->
        <!-- https://getwaves.io/ -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 230"><path fill="#7700ff" fill-opacity="1" d="M0,224L40,218.7C80,213,160,203,240,181.3C320,160,400,128,480,133.3C560,139,640,181,720,192C800,203,880,181,960,154.7C1040,128,1120,96,1200,80C1280,64,1360,64,1400,64L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>

        <h1 id='logo-title' in:fly={{duration: 500, y: 50, easing: cubicOut}}>Fronvo</h1>

        <p id='logo-descriptor' in:fly={{duration: 600, y: 25, delay: 750, easing: cubicOut}}>The next-generation social media app, tailored for you.</p>

        <button in:fly={{duration: 600, y: 25, delay: 1400, easing: cubicOut}} on:click={() => location.href = 'https://github.com/Fronvo/site'} style='margin-bottom: 20px;'>Try it online</button>

        <div id='down-arrow-container' use:scrollTo={'fronvo-safe'} in:fly={{duration: 300, y: 10, delay: 1900, easing: cubicOut}}>
            <ChevronDownIcon size='48' strokeWidth={2} class='feather-icon' />
        </div>

    </div>

    {#if SAOSReady}

        <div class='saos-content'>

            <div class='container' id='colored' use:scrollRef={'fronvo-safe'} in:fade={{duration: 500}}>
                <Saos once={true} animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}>
                    <h1>The gateway to truly free conversations</h1>

                    <div id='content'>
                        <h1>Where your data is safer than anywhere else.</h1>
                    </div>
                </Saos>
            </div>

            <div class='container' use:scrollRef={'fronvo-features'} in:fade={{duration: 500}}>
                <Saos once={true} animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}>
                    <h1>With no lack of features</h1>

                    <div id='content'>
                        <h1>Communities, Theme Marketplace, User Creations. You name it, we got it.</h1>
                    </div>
                </Saos>
            </div>

            <div class='container' id='colored' use:scrollRef={'fronvo-quirks'} in:fade={{duration: 500}}>
                <Saos once={true} animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}>
                    <h1>No quirks, no fees</h1>

                    <div id='content'>
                        <h1>Your own platform, on your own hands.</h1>
                    </div>
                </Saos>
            </div>

            <div class='container last-container' use:scrollRef={'fronvo-join'} in:fade={{duration: 500}}>
                <Saos once={true} animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}>
                    <h1>Join the Fronvo Community</h1>

                    <div id='content'>
                        <button on:click={() => location.href = 'https://github.com/Fronvo/site'}>Try Fronvo online</button>
                    </div>
                </Saos>
            </div>

        </div>

        <div class='footer'>

            <!-- Bottom Wave SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 230"><path fill="#7700ff" fill-opacity="1" d="M0,224L40,218.7C80,213,160,203,240,181.3C320,160,400,128,480,133.3C560,139,640,181,720,192C800,203,880,181,960,154.7C1040,128,1120,96,1200,80C1280,64,1360,64,1400,64L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>

            <div id='content'>
                <h1>Fronvo</h1>

                <!-- Github SVG -->
                <svg on:click={() => location.href = 'https://github.com/fronvo'} version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><style>.s0{fill:#ffffff}</style><path class="s0" d="m48 24.6q0 8-4.6 14.5q-4.6 6.4-11.8 8.9q-0.9 0.1-1.2-0.3q-0.4-0.4-0.4-0.9v-6.8q0-3.1-1.7-4.5q1.8-0.2 3.2-0.6q1.5-0.4 3-1.3q1.5-0.8 2.5-2.1q1-1.3 1.7-3.4q0.6-2.1 0.6-4.8q0-3.9-2.5-6.6q1.2-2.9-0.2-6.5q-0.9-0.3-2.5 0.3q-1.7 0.7-2.9 1.4l-1.2 0.8q-2.9-0.8-6-0.8q-3.1 0-6 0.8q-0.5-0.3-1.3-0.8q-0.9-0.6-2.6-1.3q-1.8-0.7-2.7-0.4q-1.4 3.6-0.2 6.5q-2.5 2.7-2.5 6.6q0 2.7 0.6 4.8q0.7 2.1 1.7 3.4q1 1.3 2.5 2.1q1.5 0.9 2.9 1.3q1.4 0.4 3.2 0.6q-1.2 1.1-1.5 3.3q-0.7 0.3-1.4 0.4q-0.8 0.2-1.8 0.2q-1 0-2-0.7q-1.1-0.7-1.8-2q-0.6-1-1.5-1.7q-0.9-0.6-1.5-0.7l-0.7-0.1q-0.6 0-0.9 0.1q-0.2 0.2-0.1 0.4q0.1 0.2 0.3 0.4q0.1 0.3 0.4 0.4l0.2 0.2q0.7 0.3 1.3 1.2q0.7 0.9 1 1.6l0.3 0.8q0.4 1.2 1.4 1.9q1 0.8 2.1 1q1.1 0.2 2.2 0.2q1 0 1.7-0.1l0.7-0.1q0 1.2 0 2.8q0.1 1.7 0.1 1.8q0 0.5-0.4 0.9q-0.5 0.4-1.3 0.3q-7.2-2.5-11.8-8.9q-4.6-6.5-4.6-14.5q0-6.7 3.2-12.3q3.2-5.7 8.8-9q5.5-3.3 12-3.3q6.5 0 12 3.3q5.6 3.3 8.8 9q3.2 5.6 3.2 12.3z" /></svg>
            </div>

        </div>

    {/if}
    
</div>

{/if}
