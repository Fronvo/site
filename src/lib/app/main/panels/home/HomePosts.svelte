<script lang="ts">
    import LoadMore from '$lib/app/reusables/all/LoadMore.svelte';
    import Post from '$lib/app/reusables/all/Post.svelte';
    import { guestMode, socket } from 'stores/main';
    import { homePosts as homePostsStore, totalHomePosts } from 'stores/home';
    import { setProgressBar } from 'utilities/main';

    let isLoadingMore = false;

    function loadMore(): void {
        if (isLoadingMore) return;

        isLoadingMore = true;
        setProgressBar(true);

        socket.emit(
            $guestMode ? 'fetchHomePostsGuest' : 'fetchHomePosts',
            {
                from: $homePostsStore.length.toString(),
                to: ($homePostsStore.length + 15).toString(),
            },
            ({ homePosts }) => {
                const tempPosts = $homePostsStore;
                tempPosts.push(...homePosts);

                $homePostsStore = tempPosts;

                isLoadingMore = false;
                setProgressBar(false);
            }
        );
    }
</script>

{#if $homePostsStore}
    <div class="posts-container">
        {#each $homePostsStore as { post, profileData }}
            <Post {profileData} postData={post} hideOptions />
        {/each}

        {#if $homePostsStore.length < $totalHomePosts}
            <LoadMore callback={loadMore} />
        {/if}
    </div>
{/if}

<style>
    .posts-container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>
