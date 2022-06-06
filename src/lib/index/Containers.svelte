<script lang="ts">
    import Saos from 'saos';
    import type { FronvoContainer } from 'interfaces/index/SaosContent';
    import { scrollRef } from 'svelte-scrolling';
    import { fade } from 'svelte/transition';

    const fronvoContainer: FronvoContainer[] = [
        {
            title: 'The gateway to truly free conversations',
            description: 'Where your data is safer than anywhere else',
            ref: 'fronvo-safe',
        },

        {
            title: 'With no lack of features',
            description: 'Communities, Theme Marketplace, User Creations',
            ref: 'fronvo-features',
        },

        {
            title: 'No quirks, no fees',
            description: 'Your own platform, on your own hands',
            ref: 'fronvo-quirks',
        },

        {
            title: 'Join the Fronvo Community',
            description: 'What are you waiting for?',
            ref: 'fronvo-join',
        },
    ];
</script>

{#each fronvoContainer as { title, description, ref }, index}
    <div
        class={`container ${
            index == fronvoContainer.length - 1 ? 'last-container' : ''
        }`}
        id={index % 2 == 0 ? 'colored' : ''}
        use:scrollRef={ref}
        in:fade={{ duration: 500 }}
    >
        <Saos
            once={true}
            animation={'slide-top 1.5s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'}
        >
            <h1>{title}</h1>

            <div id="content">
                <h1>{description}</h1>
            </div>
        </Saos>
    </div>
{/each}

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

    #colored {
        background: rgb(250, 244, 255);
    }

    .container {
        padding-top: 175px;
        padding-bottom: 175px;
        padding-right: 5px;
        padding-left: 5px;
    }

    .container h1 {
        font-size: 3.5rem;
        text-align: center;
        margin: 0;
    }

    .container #content {
        display: flex;
        flex-direction: column;
        width: fit-content;
        margin: auto;
        justify-content: center;
        align-items: center;
        padding-top: 25px;
    }

    .container #content h1 {
        color: rgb(166, 99, 253);
        font-size: 2.5rem;
        margin: 0;
    }

    .last-container {
        padding-bottom: 0;
    }

    @media screen and (max-width: 700px) {
        .container {
            padding-top: 87.5px;
            padding-bottom: 87.5px;
        }

        .container h1 {
            font-size: 1.9rem;
        }

        .container #content {
            padding-top: 12.5px;
        }

        .container #content h1 {
            font-size: 1.3rem;
        }

        .last-container {
            padding-bottom: 30px;
        }
    }
</style>
