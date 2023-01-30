<script lang="ts">
    import { goto } from '$app/navigation';
    import HomePosts from '$lib/app/main/panels/home/HomePosts.svelte';
    import { socket } from 'stores/all';
    import { homePosts as homePostsStore, totalHomePosts } from 'stores/home';
    import { loginSucceeded } from 'stores/main';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { getKey } from 'utilities/global';
    import { setProgressBar, setTitle } from 'utilities/main';

    let unsubscribe: Unsubscriber;

    onMount(() => {
        setProgressBar(true);

        unsubscribe = loginSucceeded.subscribe((state) => {
            if (typeof state == 'undefined') return;

            if (
                !location.href.includes('/profile') &&
                !location.href.includes('/community')
            ) {
                setTitle('Fronvo - Home');

                goto('/home', {
                    replaceState: true,
                });
            }

            loadPosts();
        });
    });

    onDestroy(() => {
        unsubscribe();
    });

    function loadPosts(): void {
        // Dont reload posts in the same session
        if (!$homePostsStore) {
            socket.emit(
                getKey('token') ? 'fetchHomePosts' : 'fetchHomePostsGuest',
                { from: '0', to: '15' },
                ({ homePosts, totalPosts }) => {
                    $totalHomePosts = totalPosts;
                    $homePostsStore = homePosts;

                    setProgressBar(false);
                }
            );
        } else {
            setProgressBar(false);
        }
    }
</script>

<div class="home-container">
    {#if $homePostsStore}
        <h1 in:fade={{ duration: 500 }} id="latest-posts">Latest posts</h1>

        <HomePosts />
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
