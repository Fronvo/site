<svelte:head>
    <title>Fronvo | Your Gateway to Free Conversations</title>
</svelte:head>

<script context='module'>
    export const ssr = false;
    export const prerender = true;
</script>

<script>
    import { onMount } from 'svelte';
    import { hasToken } from '../stores';
    import { fly } from 'svelte/transition';

    let mountReady = false;

    onMount(() => {
        if(localStorage.getItem('token')) $hasToken = true;
        else {
            mountReady = true;

            hasToken.subscribe((value) => {
                if(value) mountReady = false;
            });
        }
    });

</script>

{#if mountReady && !$hasToken}

    <div class='waves'>

        <!-- Get them wavez! -->
        <!-- https://getwaves.io/ -->

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#8006cc" fill-opacity="1" d="M0,96L48,101.3C96,107,192,117,288,144C384,171,480,213,576,202.7C672,192,768,128,864,101.3C960,75,1056,85,1152,112C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        
        <!-- actual content, not waves -->
        <div id='content'>

            <h1 transition:fly={{y: 50}}>Fronvo</h1>

            <p transition:fly={{y: 50, delay: 1000}}>
                Your personalised app for tracker-less conversations.
            </p>

            <!-- Button group -->
            <div transition:fly={{x: -100, delay: 2000}}>
                <button>Try it online</button>
            </div>
        
        </div>

        <svg id='bottom-wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#8006cc" fill-opacity="1" d="M0,96L48,101.3C96,107,192,117,288,144C384,171,480,213,576,202.7C672,192,768,128,864,101.3C960,75,1056,85,1152,112C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>

    </div>

{/if}
