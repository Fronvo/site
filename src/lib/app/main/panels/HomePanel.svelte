<script lang="ts">
    import { goto } from '$app/navigation';
    import Loading from '$lib/app/Loading.svelte';
    import HomeGrass from '$lib/app/main/panels/home/HomeGrass.svelte';
    import HomePosts from '$lib/app/main/panels/home/HomePosts.svelte';
    import { socket } from 'stores/all';
    import { homePosts as homePostsStore } from 'stores/home';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { setTitle } from 'utilities/main';

    onMount(() => {
        goto('/home', {
            replaceState: true,
        });

        loadPosts();

        setTitle('Fronvo - Home');
    });

    function loadPosts(): void {
        // Dont reload posts in the same session
        if (!$homePostsStore) {
            socket.emit('fetchHomePosts', ({ homePosts }) => {
                $homePostsStore = homePosts;
            });
        }
    }
</script>

<div class="home-container" in:fade={{ duration: 200 }}>
    {#if $homePostsStore}
        <h1 id="latest-posts">Latest posts</h1>

        <HomePosts />

        <HomeGrass />
    {:else}
        <Loading text="Loading posts.." />
    {/if}
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 100px;
        margin-right: 100px;
    }

    .home-container #latest-posts {
        color: var(--profile_info_color);
        font-size: 3rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 720px) {
        .home-container {
            margin-left: 0;
            margin-right: 0;
        }

        .home-container #latest-posts {
            font-size: 2.7rem;
            margin: 0;
        }
    }

    @media screen and (max-width: 520px) {
        .home-container #latest-posts {
            font-size: 2.3rem;
            margin: 0;
        }
    }
</style>
