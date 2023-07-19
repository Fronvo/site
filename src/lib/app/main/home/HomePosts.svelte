<script lang="ts">
    import Post from '$lib/app/reusables/all/Post.svelte';
    import { socket } from 'stores/main';
    import { homePosts as homePostsStore, totalHomePosts } from 'stores/home';
    import InfiniteLoading from 'svelte-infinite-loading';
    import { currentRoomId } from 'stores/rooms';
    import { fade } from 'svelte/transition';
    import CreatePost from './CreatePost.svelte';
    import { onMount } from 'svelte';
    import { toast } from 'svelte-sonner';
    import { ourData } from 'stores/profile';

    let welcomeText: string;

    function reloadPosts(): void {
        socket.emit(
            'fetchHomePosts',
            {
                from: '0',
                to: '20',
            },
            ({ homePosts, totalPosts }) => {
                $homePostsStore = homePosts;
                $totalHomePosts = totalPosts;
            }
        );
    }

    function updateWelcomeText(): void {
        const hour = new Date().getHours();

        welcomeText = `${hour}`;

        if (hour >= 6 && hour < 20) {
            if (hour < 12) {
                welcomeText = 'Good morning';
            } else if (hour < 17) {
                welcomeText = 'Good afternoon';
            } else {
                welcomeText = 'Good evening';
            }
        } else {
            welcomeText = 'Good night';
        }
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

            toast(`${author} just shared a post!`);

            reloadPosts();
        });

        socket.on('postRemoved', reloadPosts);
    });

    $: updateWelcomeText();
</script>

<div class="home-container" in:fade={{ duration: 150 }}>
    <div class="top-container">
        <h1 id="welcomer">
            {welcomeText}
        </h1>
    </div>

    {#if $homePostsStore.length != 0}
        <div class="posts-container">
            <CreatePost />

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
        <CreatePost />

        <div class="empty">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><g fill="none"
                    ><path
                        fill="var(--branding)"
                        d="m16.557 6.022l-.037-.75l.037.75ZM14.7 6.27l-.2-.723l.2.723Zm-2.178 1l-.376-.65l.376.65ZM7.487 6.06l-.055.748l.055-.748ZM9 6.271l-.178.728L9 6.271Zm2.465 1.022l-.349.664l.349-.664Zm1.042 8.43l.35.663l-.35-.664ZM15 14.684l-.178-.728l.178.728Zm1.49-.208l.056.748l-.056-.748Zm-4.997 1.245l-.35.664l.35-.664ZM9 14.685l.178-.728l-.178.728Zm-1.49-.208l-.056.748l.056-.748Zm-.76-1.566V7.497h-1.5v5.414h1.5Zm12 0V7.45h-1.5v5.46h1.5Zm-2.23-7.638c-.63.03-1.397.102-2.02.275l.4 1.446c.458-.127 1.09-.193 1.693-.223l-.073-1.498Zm-2.02.275c-.832.23-1.798.752-2.354 1.073l.752 1.299c.55-.32 1.372-.751 2.002-.926l-.4-1.446ZM7.432 6.81c.5.037 1.007.097 1.39.19l.356-1.457c-.505-.123-1.11-.19-1.636-.229l-.11 1.496Zm1.39.19c.726.178 1.682.637 2.294.958l.697-1.328c-.615-.322-1.713-.861-2.635-1.087L8.822 7Zm4.035 9.387c.61-.321 1.583-.792 2.321-.972l-.356-1.457c-.935.228-2.054.78-2.664 1.102l.699 1.327Zm2.321-.972c.377-.092.875-.152 1.368-.189l-.112-1.496c-.52.039-1.114.106-1.612.228l.356 1.457Zm-3.336-.355c-.61-.322-1.729-.874-2.664-1.102l-.356 1.457c.738.18 1.711.65 2.321.972l.7-1.327Zm-2.664-1.102c-.498-.122-1.093-.19-1.612-.228l-.112 1.496c.493.037.99.097 1.368.189l.356-1.457Zm8.072-1.046c0 .405-.34.783-.816.818l.112 1.496c1.186-.088 2.204-1.053 2.204-2.314h-1.5Zm1.5-5.46c0-1.194-.958-2.24-2.23-2.178l.073 1.498c.338-.017.657.263.657.68h1.5Zm-13.5 5.46c0 1.26 1.018 2.226 2.204 2.314l.112-1.496c-.476-.035-.816-.413-.816-.818h-1.5Zm6.908 2.148a.341.341 0 0 1-.316 0l-.699 1.327a1.84 1.84 0 0 0 1.714 0l-.7-1.327Zm-.012-8.438a.348.348 0 0 1-.333.008l-.697 1.328a1.848 1.848 0 0 0 1.782-.037l-.752-1.299Zm-5.396.876c0-.427.333-.714.682-.688l.11-1.496c-1.294-.095-2.292.962-2.292 2.184h1.5Z"
                    /><path
                        stroke="var(--branding)"
                        stroke-width="1.5"
                        d="M12 7.585V16"
                    /><path
                        stroke="var(--branding)"
                        stroke-width="1.5"
                        d="M2 9c0-3.771 0-5.657 1.172-6.828C4.343 1 6.229 1 10 1h4c3.771 0 5.657 0 6.828 1.172C22 3.343 22 5.229 22 9v4c0 3.771 0 5.657-1.172 6.828C19.657 21 17.771 21 14 21h-4c-3.771 0-5.657 0-6.828-1.172C2 18.657 2 16.771 2 13V9Z"
                        opacity=".5"
                    /></g
                ></svg
            >
            <h1>Posts of friends appear here</h1>
        </div>
    {/if}
</div>

<style>
    h1 {
        margin: 0;
        font-size: 1.7rem;
        text-align: center;
        margin-top: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .top-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        max-width: 1000px;
        position: fixed;
        right: 0;
        left: 0;
        background: var(--bg_trans);
        height: 65px;
        margin: auto;
        backdrop-filter: blur(10px);
        z-index: 1;
    }

    .home-container {
        display: flex;
        flex-direction: column;
        width: calc(100vw - 275px - 275px);
        min-width: 550px;
        height: calc(100vh);
        overflow-x: hidden;
    }

    .posts-container {
        display: flex;
        flex-direction: column;
    }

    .empty {
        height: calc(55vh);
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

    .empty h1 {
        margin: 0;
        font-size: 1.3rem;
    }

    .empty svg {
        width: 128px;
        height: 128px;
        cursor: default;
    }

    @media screen and (max-width: 1250px) {
        .home-container {
            width: calc(100vw - 275px - 275px + 200px);
            min-width: max-content;
        }

        .top-container {
            width: 80%;
            max-width: 575px;
            right: 200px;
        }
    }
</style>
