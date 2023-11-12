<script>
    import { onMount } from 'svelte';
    import { sineIn, sineInOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';

    let mountReady = false;

    onMount(() => {
        mountReady = true;
    });
</script>

{#if mountReady}
    <div class="loading-container">
        <img
            in:fade={{ duration: 250 }}
            src="favicon.png"
            alt="Fronvo logo"
            draggable={false}
        />

        <h1 in:fade={{ duration: 250 }}>By Fronvo</h1>
    </div>
{/if}

<style>
    .loading-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        margin: 0;
        top: 0;
    }

    img {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 110px;
        height: 110px;
        border-radius: 30px;
        animation-name: glowing;
        animation-duration: 750ms;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        animation-direction: alternate-reverse;
    }

    h1 {
        position: fixed;
        bottom: 0;
        font-size: 1.3rem;
    }

    @media screen and (max-width: 850px) {
        img {
            width: 100px;
            height: 100px;
        }

        h1 {
            font-size: 1.1rem;
        }
    }

    @media screen and (max-width: 600px) {
        img {
            width: 80px;
            height: 80px;
        }

        h1 {
            font-size: 0.9rem;
        }
    }

    @keyframes glowing {
        0% {
            box-shadow: 0 0 15px var(--pro);
        }
    }
</style>
