<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { blur, fly } from 'svelte/transition';

    let mountReady = false;

    function gotoApp(): void {
        goto('/app');
    }

    onMount(() => {
        mountReady = true;
    });
</script>

{#if mountReady}
    <div class="main">
        <h1 id="intro" transition:fly={{ y: -50, duration: 500 }}>
            All of your social media, in one.
        </h1>
        <h1
            id="descriptor"
            transition:fly={{ y: -40, duration: 550, delay: 600 }}
        >
            Your favorite social media, merged into one.
        </h1>
        <h1
            id="descriptor"
            transition:fly={{ y: -20, duration: 550, delay: 850 }}
        >
            You're at the right place.
        </h1>

        <button
            on:click={gotoApp}
            transition:blur={{ duration: 500, delay: 1200 }}
            >Explore Fronvo</button
        >
    </div>
{/if}

<style>
    .main {
        width: 100%;
        height: 100vh;
        display: flex;
        text-align: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    h1 {
        margin: 0;
    }

    #intro {
        font-size: 3.2rem;
        color: white;
        font-weight: 800;
        margin-bottom: 15px;
    }

    #descriptor {
        font-size: 1.5rem;
        color: white;
        max-width: 600px;
    }

    button {
        width: 200px;
        height: 60px;
        font-size: 1.4rem;
        font-weight: 600;
        margin-top: 30px;
        background: transparent;
        backdrop-filter: blur(10px);
        border-radius: 5px;
        background: rgb(255, 255, 255, 0.075);
        box-shadow: 0 0 100px rgb(15, 15, 15);
        box-shadow: none;
        transition: 150ms;
        color: white;
    }

    button:hover {
        background: rgb(255, 255, 255, 0.15);
        color: white;
    }

    button:active {
        opacity: 0.8;
    }

    @media screen and (max-width: 850px) {
        #intro {
            font-size: 2.7rem;
        }

        #descriptor {
            font-size: 1.3rem;
        }

        button {
            width: 180px;
            height: 55px;
            font-size: 1.2rem;
        }
    }

    @media screen and (max-width: 600px) {
        #intro {
            font-size: 2rem;
        }

        #descriptor {
            font-size: 1rem;
        }

        button {
            width: 160px;
            height: 50px;
            font-size: 1rem;
        }
    }
</style>
