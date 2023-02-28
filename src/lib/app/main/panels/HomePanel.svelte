<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { setTitle } from 'utilities/main';
    import HomePosts from './home/HomePosts.svelte';

    goto('/home', {
        replaceState: true,
    });

    setTitle('Home - Fronvo');
</script>

<div class="home-container">
    <h1 in:fade={{ duration: 250 }} id="latest-posts">Latest posts</h1>

    <HomePosts />
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 100px;
        margin-right: 100px;
        margin-bottom: 40px;
    }

    .home-container #latest-posts {
        color: var(--profile_info_color);
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 2.5rem;
        border-bottom: 5px solid var(--text_color);
        padding: 10px;
    }

    @media screen and (max-width: 700px) {
        .home-container {
            margin-left: 0;
            margin-right: 0;
        }

        .home-container #latest-posts {
            font-size: 1.7rem;
            margin: 0;
        }
    }
</style>
