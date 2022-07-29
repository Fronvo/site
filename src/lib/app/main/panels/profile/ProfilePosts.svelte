<script lang="ts">
    import type { AccountPost } from 'interfaces/app/main';
    import { viewPostModalInfo } from 'stores/app/main';
    import { userData } from 'stores/app/profile';
    import Time from 'svelte-time';
    import { fade } from 'svelte/transition';
    import { showModal } from 'utilities/app/main';

    export let posts: AccountPost[];
    let mountTransitionsDone = false;

    setTimeout(() => {
        mountTransitionsDone = true;

        // Up to 6 posts to fade, more wont be visible probably
    }, 500 + ((posts.length < 6 ? posts.length : 6 - 1) + 5) * 100);

    function showViewPost(postIndex: number): void {
        $viewPostModalInfo = $userData.posts[postIndex];
        showModal('ViewPost');
    }
</script>

<div class="posts-container" in:fade={{ delay: 900 }}>
    {#if posts.length == 0}
        <h1 in:fade={{ duration: 500, delay: 700 }} id="empty-text">
            No posts, yet
        </h1>
    {:else}
        <!-- TODO: Sort by likes / oldest / newest -->

        {#each posts as { title, content, attachment, creationDate }, i}
            <!-- TODO: Saos fade in, same delay -->
            <div
                on:click={() => showViewPost(i)}
                in:fade={{
                    duration: 500,
                    delay: !mountTransitionsDone
                        ? 500 + (posts.length - (i + 1) + 5) * 100
                        : 0,
                }}
            >
                <h1 id="title">{title}</h1>
                <h1 id="content">{content}</h1>

                {#if attachment}
                    <img
                        id="attachment"
                        src={attachment}
                        alt={`'${title}' attachment`}
                        draggable={false}
                    />
                {/if}

                <h1 id="creation-date">
                    <!-- Updates every 15 seconds -->
                    <Time
                        relative
                        format={'dddd HH:mm · MMMM D YYYY'}
                        live={15000}
                        timestamp={creationDate}
                    />
                </h1>

                <!-- TODO: Action layout for likes, sharing, comments -->
            </div>
        {/each}
    {/if}
</div>

<style>
    .posts-container {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        flex-flow: column-reverse;
    }

    .posts-container div {
        display: flex;
        flex-direction: column;
        background: var(--theme-nav_bg_color);
        box-shadow: 0 0 10px var(--theme-nav_shadow_color);
        backdrop-filter: blur(3px);
        padding: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-bottom: 30px;
        width: 550px;
        max-height: 600px;
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

    .posts-container div:hover {
        box-shadow: 0 0 20px var(--theme-nav_shadow_color);
    }

    .posts-container div #title {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin: 0;
        text-align: center;
        font-size: 2.1rem;
    }

    .posts-container div #content {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        margin: 0;
        margin-top: 10px;
        font-size: 1.8rem;
        color: var(--theme-profile_info_color);
        flex: 1;
        white-space: pre-wrap;
    }

    .posts-container div #attachment {
        max-width: 100%;
        max-height: 100%;
        margin-top: 10px;
        border-radius: 10px;
    }

    .posts-container div #creation-date {
        font-size: 1.3rem;
        margin: 0;
        margin-top: 20px;
    }

    .posts-container #empty-text {
        margin: 0;
        font-size: 2rem;
    }

    @media screen and (max-width: 720px) {
        .posts-container div {
            max-width: 400px;
            max-height: 450px;
            cursor: default;
        }

        .posts-container div:hover {
            box-shadow: 0 0 10px var(--theme-nav_shadow_color);
        }

        .posts-container div #title {
            font-size: 1.7rem;
        }

        .posts-container div #content {
            font-size: 1.4rem;
            -webkit-line-clamp: 4;
        }

        .posts-container div #creation-date {
            font-size: 1.2rem;
        }

        .posts-container #empty-text {
            font-size: 1.8rem;
        }
    }

    @media screen and (max-width: 520px) {
        .posts-container div {
            max-width: 300px;
            max-height: 400px;
        }

        .posts-container div #title {
            font-size: 1.5rem;
        }

        .posts-container div #content {
            font-size: 1.2rem;
            -webkit-line-clamp: 3;
        }

        .posts-container div #creation-date {
            font-size: 1.1rem;
        }

        .posts-container #empty-text {
            font-size: 1.6rem;
        }
    }
</style>
