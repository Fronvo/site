<script lang="ts">
    import Post from '$lib/app/reusables/all/Post.svelte';
    import { socket } from 'stores/main';
    import { homePosts as homePostsStore, totalHomePosts } from 'stores/home';
    import InfiniteLoading from 'svelte-infinite-loading';
    import { currentRoomId } from 'stores/rooms';
    import { fade } from 'svelte/transition';
    import CreatePost from './CreatePost.svelte';
    import { onMount } from 'svelte';
    import { ourData } from 'stores/profile';
    import PropPost from '$lib/app/reusables/dashboard/PropPost.svelte';

    function reloadPosts(): void {
        socket.emit(
            'fetchHomePosts',
            {
                from: '0',
                to: '20',
            },
            ({ homePosts, totalPosts }) => {
                $homePostsStore = [];

                setTimeout(() => {
                    $homePostsStore = homePosts;
                    $totalHomePosts = totalPosts;
                }, 0);
            }
        );
    }

    async function loadMore({ detail: { loaded, complete } }): Promise<void> {
        socket.emit(
            'fetchHomePosts',
            {
                from: $homePostsStore.length.toString(),
                to: ($homePostsStore.length + 15).toString(),
            },
            ({ homePosts }) => {
                if (homePosts.length == 0) {
                    complete();
                } else {
                    const tempPosts = $homePostsStore;
                    tempPosts.push(...homePosts);

                    $homePostsStore = tempPosts;

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

<div class="dashboard-container">
    <CreatePost />

    {#if $homePostsStore.length != 0}
        <div class="posts-container">
            {#if $homePostsStore && !$currentRoomId}
                {#each $homePostsStore as post}
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
                        d="M9.5 20v2a.75.75 0 0 0 1.5 0v-2H9.5Zm5.5 0h-1.5v2a.75.75 0 0 0 1.5 0v-2Z"
                    /><path
                        fill-rule="evenodd"
                        d="m17.385 6.585l.256-.052a2.181 2.181 0 0 1 1.24.115c.69.277 1.446.328 2.165.148l.061-.015c.524-.131.893-.618.893-1.178v-2.13c0-.738-.664-1.282-1.355-1.109c-.396.1-.812.071-1.193-.081l-.073-.03a3.517 3.517 0 0 0-2-.185l-.449.09c-.54.108-.93.6-.93 1.17v6.953c0 .397.31.719.692.719a.706.706 0 0 0 .693-.72V6.586Z"
                        clip-rule="evenodd"
                    /><path
                        d="M14.5 6v4.28c0 1.172.928 2.22 2.192 2.22c1.265 0 2.193-1.048 2.193-2.22V8.229c.76.205 1.56.23 2.335.067c.492.842.78 1.86.78 2.955v6.175C22 18.847 21.012 20 19.793 20H12.5v-8.75c0-2.03-.832-3.974-2.217-5.25H14.5Z"
                    /><path
                        fill-rule="evenodd"
                        d="M2 11.25C2 8.35 4.015 6 6.5 6S11 8.35 11 11.25V20H4.233C3 20 2 18.834 2 17.395V11.25ZM4.25 16a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                        clip-rule="evenodd"
                    /></svg
                >

                <h1>When your friends post content, they will appear here!</h1>
            </div>

            <div class="props">
                {#each { length: 20 } as _, i}
                    <PropPost opacity={1 - 0.95 + (1 - (i + 2.5) / 12.5)} />
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

    .dashboard-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: calc(100vh);
        overflow: hidden;
        background: var(--bg);
    }

    .posts-container {
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
    }

    .banner h1 {
        margin: 0;
        font-size: 1.3rem;
        text-align: center;
    }

    .banner svg {
        width: 32px;
        height: 32px;
        fill: var(--pro);
        margin-right: 10px;
    }

    .props {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>
