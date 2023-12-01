<script lang="ts">
    import Post from '$lib/app/reusables/dashboard/PostProfile.svelte';
    import { socket } from 'stores/main';
    import {
        dashboardPosts as dashboardPostsStore,
        totalDashboardPosts,
    } from 'stores/dashboard';
    import InfiniteLoading from 'svelte-infinite-loading';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { ourData } from 'stores/profile';
    import PropPost from '$lib/app/reusables/dashboard/PropPost.svelte';
    import { sineInOut } from 'svelte/easing';
    import PropFriend from '$lib/app/reusables/dashboard/PropFriend.svelte';

    function reloadPosts(): void {
        socket.emit(
            'fetchHomePosts',
            {
                from: '0',
                to: '20',
            },
            ({ homePosts, totalPosts }) => {
                $dashboardPostsStore = [];

                setTimeout(() => {
                    $dashboardPostsStore = homePosts;
                    $totalDashboardPosts = totalPosts;
                }, 0);
            }
        );
    }

    async function loadMore({ detail: { loaded, complete } }): Promise<void> {
        socket.emit(
            'fetchHomePosts',
            {
                from: $dashboardPostsStore.length.toString(),
                to: ($dashboardPostsStore.length + 15).toString(),
            },
            ({ homePosts }) => {
                if (homePosts.length == 0) {
                    complete();
                } else {
                    const tempPosts = $dashboardPostsStore;
                    tempPosts.push(...homePosts);

                    $dashboardPostsStore = tempPosts;

                    loaded();
                }
            }
        );
    }

    onMount(() => {
        socket.off('postShared');
        socket.off('postRemoved');

        socket.on('postShared', ({ author }) => {
            if (author == $ourData.profileId) return;

            reloadPosts();
        });

        socket.on('postRemoved', reloadPosts);
    });
</script>

<div class="home-container" in:fade={{ duration: 200, easing: sineInOut }}>
    {#if $dashboardPostsStore.length != 0}
        <div class="friends-container">
            {#if $dashboardPostsStore}
                {#each $dashboardPostsStore as post}
                    <Post {post} />
                {/each}

                <InfiniteLoading
                    distance={1000}
                    on:infinite={loadMore}
                    direction="bottom"
                >
                    <div slot="noMore" />
                    <div slot="noResults" />
                    <div slot="error" />
                    <div slot="spinner" />
                </InfiniteLoading>
            {/if}
        </div>
    {:else}
        <div class="empty">
            <div class="banner">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    ><path
                        d="M7 4.83c0 1.547 1.726 3.178 3.15 4.26c.799.606 1.198.91 1.85.91c.652 0 1.051-.304 1.85-.91C15.274 8.007 17 6.376 17 4.83c0-2.79-2.75-3.833-5-1.677C9.75.997 7 2.039 7 4.829Zm-.74 16.558H6c-.943 0-1.414 0-1.707-.293C4 20.803 4 20.332 4 19.389v-1.112c0-.518 0-.777.133-1.009c.133-.231.334-.348.736-.582c2.646-1.539 6.402-2.405 8.91-.91c.168.101.32.223.45.368a1.492 1.492 0 0 1-.126 2.134a.998.998 0 0 1-.427.24c.12-.014.235-.03.345-.047c.911-.145 1.676-.633 2.376-1.162l1.808-1.365a1.887 1.887 0 0 1 2.22 0c.573.433.749 1.146.386 1.728c-.423.678-1.019 1.545-1.591 2.075c-.573.53-1.426 1.004-2.122 1.34c-.772.373-1.624.587-2.491.728c-1.758.284-3.59.24-5.33-.118a15.031 15.031 0 0 0-3.017-.308Z"
                    /></svg
                >

                <h1>Your friends show up here!</h1>
            </div>

            <div class="props">
                {#each { length: 10 } as _, i}
                    <PropFriend opacity={1 - 0.95 + (1 - (i + 2.5) / 12.5)} />
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    h1 {
        margin: 0;
        font-size: 1.7rem;
        text-align: center;
        margin-top: 10px;
        font-weight: 500;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .home-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        margin: auto;
        width: 100%;
        height: calc(100vh);
        overflow-x: hidden;
        margin-top: 5px;
        padding-top: 20px;
    }

    .friends-container {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        margin-top: 65px;
    }

    .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        justify-content: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .banner {
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 7px;
        margin: 15px;
        margin-top: 0;
        padding-top: 0;
    }

    .banner h1 {
        margin: 0;
        font-size: 1.3rem;
        text-align: center;
    }

    .banner svg {
        width: 32px;
        height: 32px;
        fill: var(--branding);
        margin-right: 10px;
    }

    .props {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>
