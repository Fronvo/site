<script lang="ts">
    import type { FronvoContainer } from 'interfaces/index/SaosContent';
    import Saos from 'saos';
    import { fade } from 'svelte/transition';

    const fronvoContainer: FronvoContainer[] = [
        {
            title: 'Packed with features',
            svg: 'many-features',
            extraSized: true,
        },

        {
            title: 'Truly private social media',
            svg: 'free-convos',
        },

        {
            title: 'Only the latest technologies',
            svg: 'latest-tech',
        },
    ];
</script>

{#each fronvoContainer as { title, svg, extraSized }, index}
    <div
        class={`container ${
            index == fronvoContainer.length - 1 ? 'last-container' : ''
        }`}
        in:fade={{ duration: 500 }}
    >
        <Saos
            animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
        >
            <h1 id="title">{title}</h1>
        </Saos>

        <Saos
            animation={'slide-top 3s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
        >
            <img
                class={`svg ${extraSized ? 'svg-extra' : ''}`}
                src={`svgs/${svg}.svg`}
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
        font-size: 3.5rem;
        text-align: center;
        margin: 0;
    }

    .container .svg {
        border-radius: 15px;
        transition: 300ms all;
        animation: rainbow;
        animation-duration: 5000ms;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    .container .svg:hover {
        transform: scale(1.1, 1.1);
    }

    @media screen and (max-width: 700px) {
        .container #title {
            font-size: 1.9rem;
            margin-bottom: 10px;
        }

        .container .svg {
            width: 250px;
            height: 250px;
        }

        .container .svg-extra {
            width: 400px;
            height: 241px;
        }
    }

    @media screen and (max-width: 520px) {
        .container .svg {
            width: 175px;
            height: 175px;
        }

        .container .svg-extra {
            width: 289px;
            height: 175px;
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

    @keyframes rainbow {
        0% {
            border: 3px solid rgb(0, 132, 255);
            box-shadow: 0 0 10px rgb(0, 132, 255);
        }

        25% {
            border: 3px solid rgb(255, 108, 108);
            box-shadow: 0 0 10px rgb(255, 108, 108);
        }

        50% {
            border: 3px solid rgb(121, 255, 121);
            box-shadow: 0 0 10px rgb(121, 255, 121);
        }

        75% {
            border: 3px solid rgb(114, 114, 255);
            box-shadow: 0 0 10px rgb(114, 114, 255);
        }

        100% {
            border: 3px solid rgb(211, 37, 255);
            box-shadow: 0 0 10px rgb(211, 37, 255);
        }
    }
</style>
