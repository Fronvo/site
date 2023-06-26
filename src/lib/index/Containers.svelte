<script lang="ts">
    import type { FronvoContainer } from 'interfaces/all';
    import Saos from 'saos';
    import { fade } from 'svelte/transition';

    const fronvoContainer: FronvoContainer[] = [
        {
            title: 'Shitty social media',
        },
        {
            title: 'Packed with useless features',
        },
        {
            title: 'Beat your meat to lolis',
        },
        {
            title: 'Focus on your life because this is a waste of time',
        },
    ];
</script>

{#each fronvoContainer as { title }, index}
    <div
        class={`container ${
            index == fronvoContainer.length - 1 ? 'last-container' : ''
        }`}
        in:fade={{ duration: 500 }}
    >
        <Saos
            once
            animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
        >
            <h1 id="title">{title}</h1>
        </Saos>

        <Saos
            once
            animation={'slide-top 3s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
        >
            USELESS PLATFORM LMFAO PLEASE DONT LOGIN
        </Saos>
    </div>
{/each}

<style>
    .container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container #title {
        font-size: 4.5rem;
        font-weight: 900;
        text-align: center;
        margin: 0;
        transition: 300ms all;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        color: transparent;
        background: linear-gradient(90deg, green, black);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    @media screen and (max-width: 850px) {
        .container #title {
            font-size: 2.5rem;
            margin-bottom: 10px;
            margin-right: 5px;
            margin-left: 5px;
        }
    }

    /* For SAOS, animation on scroll */
    @keyframes -global-slide-top {
        0% {
            opacity: 0;
            transform: translateY(75px);
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
