<script>
    import { onMount } from 'svelte';
    import { fade, scale } from 'svelte/transition';

    let mountReady = false;

    onMount(() => {
        mountReady = true;
    });
</script>

{#if mountReady}
    <div class="loading-container" out:scale={{ duration: 1000 }}>
        <svg
            in:scale={{ duration: 250, start: 2, opacity: 1 }}
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="512"
            height="512"
            fill="currentColor"
            ><path
                d="m354.2 226.4q-1 3.7-3.7 10.5-2.7 6.9-6.1 15.7-3.4 8.6-7.6 18.4-4.2 9.6-8.1 18.9-1.7 4.2-4.2 6.1-2.2 2-9.3 2.3l-71.6 1.2-8.8 108.9q-0.3 2.2-1.3 4.4-0.9 2-2.9 3.2-0.7 0.5-5.9 2.9-4.9 2.2-12.5 5.4-7.6 3.2-16.7 6.9-9 3.7-17.9 6.9-8.8 2.9-16.2 5.1-7.3 2-11.5 2-4.9 0-9.1-1.7-3.9-2-3.9-7.7-0.2-12.2 0.5-26.9 1-15 2.2-30.2 1.2-15.5 2.7-30.2 1.5-14.9 2.5-27.2l1.7-20.6q-20.6 0-29.5-1-8.8-1.2-8.8-5.9 0-3.2 3.7-8.3 5.1-7.1 11.5-17.2 6.6-10 12.5-19.6 6.2-9.6 10.6-16.9 4.6-7.4 5.9-9.1l4.6-67.4q-4.6 0-8.1 0.2-3.4 0-6.3 0.2-2.7 0-5.2 0.3-2.5 0-5.1 0-11.8 0-17-1.2-4.9-1.5-4.9-5.2 0-1.7 3-7.1 2.9-5.4 7.1-12.3 4.4-7.1 9.3-14.7 5.1-7.8 9.1-14.5l14.7-25 111.6-3.9q21.6-0.7 42.9-1.5 21.4-0.9 39.3-1.7 18.1-0.7 31.1-1.2 13-0.7 18.2-1 0.2 0 1.2 0.3 1.2 0 2.4 0.7 1.3 0.5 2.2 2 1.3 1.4 1.3 4.1 0 1.5-3.5 9.8-3.4 8.4-9.8 24.8l-10.8 28.5q-1.7 4.1-3.9 6.3-2.2 2.2-9.3 2.5-8.4 0.2-16.9 0.7-8.6 0.5-17.7 1l-74.6 3.7q-1.4 9.6-2.2 14.2-0.5 4.7-0.7 7.9 0 2.9 0 6.1 0 2.9-0.2 9.6-0.3 4.6-0.8 7.8-0.2 3.2-0.7 6.4-0.3 2.9-0.8 6.4-0.2 3.4-0.4 8.5 16.1-0.4 31.6-0.9 15.7-0.5 28.7-1 13.2-0.5 22.8-0.8 9.6-0.4 13.5-0.4 2 0 4.4 1.4 2.5 1.5 2.5 5.7 0 1.9-0.8 4.4z"
            /></svg
        >

        <h1 in:fade={{ duration: 250 }}>By Fronvo</h1>
    </div>
{/if}

<style>
    svg {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        height: max-content;
        width: 128px;
        height: 128px;
        cursor: default;
        fill: var(--text);
        overflow: hidden;
    }

    h1 {
        position: fixed;
        width: max-content;
        left: 0;
        right: 0;
        bottom: 20px;
        margin: auto;
        font-size: 1.2rem;
        font-weight: 500;
    }

    @media screen and (max-width: 850px) {
        svg {
            width: 80px;
            height: 80px;
        }

        h1 {
            font-size: 1.1rem;
        }
    }

    @media screen and (max-width: 600px) {
        h1 {
            font-size: 0.9rem;
        }
    }
</style>
