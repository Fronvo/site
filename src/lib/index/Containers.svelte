<script lang="ts">
    import type { FronvoContainer } from 'interfaces/index/SaosContent';
    import Saos from 'saos';
    import { fade } from 'svelte/transition';

    const fronvoContainer: FronvoContainer[] = [
        {
            title: 'Truly private social media',
            svg: 'free-convos',
        },
        {
            title: 'Packed with features',
            svg: 'many-features',
        },
        {
            title: 'Beat your addictions',
            svg: 'beat-addictions',
        },
        {
            title: "Focus on what's important",
            svg: 'focus-important',
        },
    ];
</script>

{#each fronvoContainer as { title, svg }, index}
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
            <img
                class="svg"
                src={`/svgs/containers/${svg}.svg`}
                alt={`${svg} icon`}
                draggable={false}
            />
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
        background: linear-gradient(
            90deg,
            #ff81ea 10.42%,
            #dbc2ff 54.68%,
            #64c1ff 99.98%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .container .svg {
        border-radius: 15px;
        transition: 400ms all;
        border: 3px solid white;
    }

    .container .svg:hover {
        transform: scale(1.1, 1.1);
    }

    @media screen and (max-width: 720px) {
        .container #title {
            font-size: 3rem;
            margin-bottom: 10px;
            margin-right: 5px;
            margin-left: 5px;
        }

        .container .svg {
            height: 230px;
        }
    }

    @media screen and (max-width: 520px) {
        .container #title {
            font-size: 2.5rem;
        }

        .container .svg {
            height: 180px;
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
