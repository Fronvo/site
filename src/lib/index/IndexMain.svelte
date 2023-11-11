<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { blur, scale } from 'svelte/transition';

    let mountReady = false;

    function gotoApp(): void {
        goto('/app');
    }

    onMount(() => {
        mountReady = true;
    });
</script>

{#if mountReady}
    <div
        class="main"
        transition:blur={{ duration: 500, amount: 20, opacity: 0.5 }}
    >
        <div class="showcase">
            <img src="favicon.png" draggable={false} alt="Fronvo logo" />
            <h1 id="name">Fronvo</h1>
        </div>

        <h1>
            The <span>ONLY</span> social media app with <span>ZERO</span> tracking.
        </h1>

        <button
            on:click={gotoApp}
            transition:scale={{ duration: 250, start: 0.95, delay: 500 }}
            >Join us now</button
        >
    </div>
{/if}

<style>
    .main {
        width: 100%;
        margin-bottom: 50px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        user-select: none;
    }

    .showcase {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
    }

    h1 {
        margin: 0;
    }

    #name {
        font-size: 5.5rem;
        font-weight: 800;
        margin-right: 10px;
    }

    button {
        font-size: 1.8rem;
        margin-top: 20px;
        background: #00e79a;
        box-shadow: 0 0 10px #00e79a;
        border: 3px solid #00e79a;
        transition: 150ms;
        color: white;
    }

    button:hover {
        background: #00e79a;
        box-shadow: 0 0 20px #00e79a;
        color: white;
    }

    span {
        font-weight: 900;
        color: transparent;
        text-align: center;
        background: #00c986;
        text-shadow: 0 0 60px var(--pro);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
    }

    @media screen and (max-width: 850px) {
        #name {
            font-size: 4rem;
        }

        img {
            width: 64px;
            height: 64px;
        }

        h1 {
            font-size: 1.5rem;
        }

        button {
            font-size: 1.6rem;
        }
    }

    @media screen and (max-width: 600px) {
        #name {
            font-size: 3rem;
        }

        img {
            width: 54px;
            height: 54px;
        }

        h1 {
            font-size: 1.2rem;
        }

        button {
            font-size: 1.2rem;
        }
    }
</style>
