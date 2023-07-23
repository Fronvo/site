<script lang="ts">
    import { socket } from 'stores/main';
    import type { Post as PostInterface, FronvoAccount } from 'interfaces/all';
    import Post from '../all/Post.svelte';
    import InfiniteLoading from 'svelte-infinite-loading';
    import { onMount } from 'svelte';
    import { fade, scale, slide } from 'svelte/transition';

    export let data: FronvoAccount;
    export let small = false;

    let posts: PostInterface[] = [];
    let loadFinished = false;
    let reveal = false;

    let previousEmpty = false;

    function loadMore({ detail: { loaded } }): void {
        if (previousEmpty) {
            loaded();
            return;
        }

        socket.emit(
            'fetchProfilePosts',
            {
                profileId: data.profileId,
                from: posts.length.toString(),
                to: (posts.length + 10).toString(),
            },
            ({ profilePosts }) => {
                if (profilePosts.length == 0) {
                    previousEmpty = true;

                    loaded();
                }

                const tempPosts = posts;
                tempPosts.push(...profilePosts);

                posts = tempPosts;

                loaded();
            }
        );
    }

    function showPosts(): void {
        socket.emit(
            'fetchProfilePosts',
            {
                profileId: data.profileId,
                from: '0',
                to: '10',
            },
            ({ err, profilePosts }) => {
                if (err) return;

                posts = profilePosts;

                setTimeout(() => {
                    loadFinished = true;
                }, 200);
            }
        );
    }

    onMount(showPosts);
</script>

{#if loadFinished && posts?.length != 0}
    <div class="posts-container" transition:slide={{ duration: 250 }}>
        {#if reveal}
            <h1 id="descriptor">
                <span>{data.totalPosts} posts</span>
            </h1>
        {/if}

        {#if reveal}
            <div transition:fade={{ duration: 250 }}>
                {#each posts as post}
                    <Post {post} {small} />
                {/each}

                {#if !previousEmpty}
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
        {:else if posts.length > 0}
            <button class="modal-button" on:click={() => (reveal = true)}
                >Reveal posts</button
            >
        {/if}
    </div>
{/if}

<style>
    .posts-container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-left: 32px;
        padding-bottom: 10px;
        margin-right: 10px;
        padding-top: 5px;
        height: 100%;
    }

    #descriptor {
        margin: 0;
        margin-top: 5px;
        font-size: 0.8rem;
        font-weight: 900;
        text-align: start;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
        width: max-content;
        margin: auto;
        padding-bottom: 5px;
        border-bottom: 2px solid var(--branding);
    }

    button {
        font-size: 1rem;
        box-shadow: none;
        transition: 150ms;
        width: max-content;
        margin: auto;
        margin-top: 10px;
    }

    button:hover {
        background: var(--secondary);
    }
</style>
