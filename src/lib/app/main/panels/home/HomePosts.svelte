<script lang="ts">
    import { homePosts } from 'stores/app/home';
    import { postModalForHome, postModalInfo } from 'stores/app/main';
    import Time from 'svelte-time';
    import { fade } from 'svelte/transition';
    import { showModal } from 'utilities/app/main';

    const posts = homePosts;

    function viewPost(postIndex: number): void {
        $postModalInfo = $homePosts[postIndex];
        $postModalForHome = true;
        showModal('ViewPost');
    }
</script>

<div class="posts-container" in:fade={{ delay: 700 }}>
    {#if $posts.length == 0}
        <h1 in:fade={{ duration: 500, delay: 700 }} id="empty-text">
            No posts, yet
        </h1>
    {:else}
        {#each $posts as { post, profileData }, i}
            <div
                on:click={() => viewPost(i)}
                class="post-container"
                in:fade={{
                    duration: 500,
                    delay: 500,
                }}
            >
                <div class="author-container">
                    <img
                        id="avatar"
                        src={profileData.avatar
                            ? profileData.avatar
                            : 'https://fronvo.vercel.app/svgs/profile/default.svg'}
                        draggable={false}
                        alt={`${profileData.username}'s avatar`}
                    />
                    <h1 id="author">{profileData.username}</h1>
                </div>

                <h1 id="title">{post.title}</h1>
                <h1 id="content">{post.content}</h1>

                {#if post.attachment}
                    <img
                        id="attachment"
                        src={post.attachment}
                        alt={`'${post.title}' attachment`}
                        draggable={false}
                    />
                {/if}

                <h1 id="creation-date">
                    <!-- Updates every 15 seconds -->
                    <Time
                        relative
                        format={'dddd HH:mm · MMMM D YYYY'}
                        live={15000}
                        timestamp={post.creationDate}
                    />
                </h1>
            </div>
        {/each}
    {/if}
</div>

<style>
    .posts-container {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }

    .post-container {
        display: flex;
        flex-direction: column;
        background: var(--nav_bg_color);
        box-shadow: 0 0 10px var(--nav_shadow_color);
        padding: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-bottom: 30px;
        width: 550px;
        max-height: 650px;
        border-radius: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: 150ms box-shadow;
        cursor: pointer;
        align-items: center;
    }

    .post-container:hover {
        box-shadow: 0 0 20px var(--nav_shadow_color);
    }

    .author-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .author-container #avatar {
        width: 75px;
        height: 75px;
    }

    .author-container #author {
        color: var(--profile_info_color);
        font-size: 2.8rem;
        margin: 0;
    }

    .post-container #title {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin: 0;
        text-align: center;
        font-size: 2.1rem;
    }

    .post-container #content {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        margin: 0;
        margin-top: 10px;
        font-size: 1.8rem;
        color: var(--profile_info_color);
        flex: 1;
        white-space: pre-wrap;
        text-align: center;
    }

    .post-container #attachment {
        max-width: 100%;
        max-height: 275px;
        margin-top: 10px;
        border-radius: 10px;
    }

    .post-container #creation-date {
        font-size: 1.3rem;
        margin: 0;
        margin-top: 20px;
    }

    .posts-container #empty-text {
        margin: 0;
        font-size: 2rem;
    }

    @media screen and (max-width: 720px) {
        .post-container {
            max-width: 400px;
            max-height: 500px;
            cursor: default;
        }

        .post-container:hover {
            box-shadow: 0 0 10px var(--nav_shadow_color);
        }

        .author-container {
            margin-bottom: 5px;
        }

        .author-container #avatar {
            width: 64px;
            height: 64px;
        }

        .author-container #author {
            font-size: 2.5rem;
        }

        .post-container #title {
            font-size: 1.7rem;
        }

        .post-container #content {
            font-size: 1.4rem;
            -webkit-line-clamp: 4;
        }

        .post-container #attachment {
            max-height: 225px;
        }

        .post-container #creation-date {
            font-size: 1.2rem;
        }

        .posts-container #empty-text {
            font-size: 1.8rem;
        }
    }

    @media screen and (max-width: 520px) {
        .post-container {
            max-width: 300px;
            max-height: 450px;
        }

        .author-container #avatar {
            width: 48px;
            height: 48px;
        }

        .author-container #author {
            font-size: 2.2rem;
        }

        .post-container #title {
            font-size: 1.5rem;
        }

        .post-container #content {
            font-size: 1.2rem;
            -webkit-line-clamp: 3;
        }

        .post-container #attachment {
            max-height: 200px;
        }

        .post-container #creation-date {
            font-size: 1.1rem;
        }

        .posts-container #empty-text {
            font-size: 1.6rem;
        }
    }
</style>
