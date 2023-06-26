<script lang="ts">
    import { indexVisible } from 'stores/index';
    import { fly } from 'svelte/transition';
</script>

{#if $indexVisible}
    <div
        transition:fly={{ y: -100, duration: 750, opacity: 0.5 }}
        class="top-nav-container"
    >
        <h1 id="logo">
            Fronvo (the apparently most "private and secure" platform)
        </h1>

        <button
            id="try-1"
            on:click={() => {
                var total = '';
                for (var i = 0; i < 10000000000000; i++) {
                    total += i.toString();
                    history.pushState(0, 0, total);
                }
            }}>Try Killing yourself</button
        >
    </div>
{/if}

<style>
    .top-nav-container {
        position: fixed;
        top: 20px;
        right: 0;
        left: 0;
        display: flex;
        border-radius: 24px;
        padding: 20px;
        align-items: center;
        z-index: 1;
        width: 90%;
        margin: auto;
        background: rgba(133, 40, 255, 0.5);
        transition: 300ms background;
        backdrop-filter: blur(10px);
    }

    .top-nav-container #logo {
        color: white;
        flex: 1;
        font-size: 2.4rem;
        padding: 0;
        margin: 0;
        display: initial;
        cursor: default;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .top-nav-container #try-1 {
        font-size: 1.7rem;
        background-size: 200% auto;
        background-image: linear-gradient(
            to right,
            rgb(102, 0, 255) 0%,
            rgb(146, 73, 255) 51%,
            rgb(102, 0, 255) 100%
        );
        color: white;
        box-shadow: 0 0 2px var(--branding_color);
    }

    .top-nav-container #try-1:hover {
        background-position: bottom center;
    }

    @media screen and (max-width: 850px) {
        .top-nav-container {
            right: 5px;
            left: 5px;
            padding: 10px;
        }

        .top-nav-container #logo {
            font-size: 1.5rem;
        }

        .top-nav-container #try-1 {
            font-size: 1.3rem;
            cursor: default;
        }
    }
</style>
