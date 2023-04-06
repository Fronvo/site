<script lang="ts">
    import { guestMode, socket } from 'stores/main';
    import type { AccountPost, FronvoAccount } from 'interfaces/all';
    import { setProgressBar } from 'utilities/main';
    import Post from '../all/Post.svelte';
    import { ourData } from 'stores/profile';
    import LoadMore from '../all/LoadMore.svelte';

    export let data: FronvoAccount;
    export let posts: AccountPost[];

    let isLoadingMore = false;

    function loadMore(): void {
        if (isLoadingMore) return;

        isLoadingMore = true;
        setProgressBar(true);

        socket.emit(
            'fetchProfilePosts',
            {
                profileId: data.profileId,
                from: posts.length.toString(),
                to: (posts.length + 10).toString(),
            },
            ({ profilePosts }) => {
                const tempPosts = posts;
                tempPosts.push(...profilePosts);

                posts = tempPosts;

                isLoadingMore = false;
                setProgressBar(false);
            }
        );
    }
</script>

{#if !$guestMode && posts}
    <div class="posts-container">
        {#if data.totalPosts > 0 && (!data.isPrivate || data.isFollower || data.isSelf)}
            <h1 id="counter">
                <span>{data.totalPosts}</span> post{data.totalPosts > 1
                    ? 's'
                    : ''}
            </h1>

            {#each posts as postData}
                <Post
                    profileData={data}
                    {postData}
                    hideOptions={data.profileId != $ourData.profileId}
                />
            {/each}

            {#if posts.length < data.totalPosts}
                <LoadMore callback={loadMore} />
            {/if}
        {/if}
    </div>
{/if}

<style>
    .posts-container {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .posts-container #counter {
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-size: 1.5rem;
        border-bottom: 5px solid var(--branding_color);
        padding: 10px;
    }

    .posts-container #counter span {
        color: var(--profile_info_color);
    }

    @media screen and (max-width: 850px) {
        .posts-container #counter {
            font-size: 1.2rem;
        }
    }
</style>
