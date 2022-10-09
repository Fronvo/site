<script lang="ts">
    import { postModalForHome, postModalInfo } from 'stores/app/main';
    import {
        profileLoadingFinished,
        userData,
        userPosts,
    } from 'stores/app/profile';
    import Time from 'svelte-time';
    import { fade } from 'svelte/transition';
    import { ModalTypes } from 'types/app/main';
    import { showModal } from 'utilities/app/main';

    let mountTransitionsDone = false;

    setTimeout(() => {
        mountTransitionsDone = true;
    }, 500);

    function showViewPost(postIndex: number): void {
        $postModalInfo = $userPosts[postIndex];
        $postModalForHome = false;
        showModal(ModalTypes.ViewPost);
    }
</script>

{#if $profileLoadingFinished}
    <div class="posts-container" in:fade={{ duration: 500 }}>
        {#if $userPosts.length == 0}
            <h1 in:fade={{ duration: 500 }} id="empty-text">
                {$userData.isFollower ||
                $userData.isSelf ||
                !$userData.isPrivate
                    ? 'No posts, yet'
                    : 'This profile is private'}
            </h1>
        {:else}
            {#each $userPosts as { title, content, attachment, creationDate }, i}
                <div
                    class="post-container"
                    on:click={() => showViewPost(i)}
                    in:fade={{
                        duration: 500,
                        delay: !mountTransitionsDone ? 500 : 0,
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
                </div>
            {/each}
        {/if}
    </div>
{/if}

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

    .post-container:hover {
        box-shadow: 0 0 20px var(--nav_shadow_color);
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
        max-width: 100%;
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
            max-height: 450px;
            cursor: default;
        }

        .post-container:hover {
            box-shadow: 0 0 10px var(--nav_shadow_color);
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
            max-height: 400px;
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
