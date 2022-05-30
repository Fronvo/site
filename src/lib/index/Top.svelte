<script lang="ts">
    import { scrollTo } from 'svelte-scrolling';
    import { cubicOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import DownArrow from '../svgs/DownArrow.svelte';
    import Wave from '../svgs/Wave.svelte';
</script>

<div class="top-container">
    <Wave />

    <h1 id="title" in:fly={{ duration: 500, y: 50, easing: cubicOut }}>
        Fronvo
    </h1>

    <p
        id="description"
        in:fly={{ duration: 600, y: 25, delay: 750, easing: cubicOut }}
    >
        The next-generation social media app, tailored for you.
    </p>

    <button
        id="try-btn"
        in:fly={{ duration: 600, y: 25, delay: 1400, easing: cubicOut }}
        on:click={() => (location.href = 'https://github.com/Fronvo/site')}
        >Try it online</button
    >

    <div
        class="arrow-container"
        use:scrollTo={'fronvo-safe'}
        in:fly={{ duration: 300, y: 10, delay: 1900, easing: cubicOut }}
    >
        <DownArrow drawDelay={1700} />
    </div>
</div>

<style>
    .top-container {
        text-align: center;
        margin-bottom: 100px;
    }

    .top-container #title {
        margin: 0;
        font-size: 7rem;
    }

    .top-container #description {
        margin: 0;
        margin-bottom: 25px;
        font-size: 2.3rem;
        padding-left: 2px;
        padding-right: 2px;
    }

    .top-container #try-btn {
        margin-bottom: 25px;
        font-size: 2.5rem;
    }

    .top-container .arrow-container {
        width: max-content;
        margin: auto;
        animation: float;
        animation-duration: 1250ms;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    /* Responsive design */
    @media screen and (max-width: 700px) {
        .top-container {
            margin-bottom: 50px;
        }

        .top-container #title {
            font-size: 5rem;
        }

        .top-container #description {
            font-size: 1.5rem;
        }

        .top-container #try-btn {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
    }

    @keyframes float {
        0% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(10px);
        }
    }
</style>
