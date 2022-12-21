<script lang="ts">
    import linkifyHtml from 'linkify-html';
    import { dataSaver, socket } from 'stores/all';
    import { postModalForHome, postModalInfo } from 'stores/main';
    import {
        profileLoadingFinished,
        userData,
        userPosts,
    } from 'stores/profile';
    import { onDestroy, onMount } from 'svelte';
    import Time from 'svelte-time';
    import type { Unsubscriber } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { ModalTypes } from 'types/main';
    import { showModal } from 'utilities/main';

    let mountTransitionsDone = false;
    let unsubscribe: Unsubscriber;
    let isLoadingMore = false;

    function showViewPost(postIndex: number): void {
        $postModalInfo = $userPosts[postIndex];
        $postModalForHome = false;
        showModal(ModalTypes.ViewPost);
    }

    function loadMorePosts(): void {
        if (isLoadingMore) return;

        isLoadingMore = true;

        socket.emit(
            'fetchProfilePosts',
            {
                profileId: $userData.profileId,
                from: $userPosts.length.toString(),
                to: ($userPosts.length + 5).toString(),
            },
            ({ profilePosts }) => {
                const tempPosts = $userPosts;
                tempPosts.push(...profilePosts.reverse());

                $userPosts = tempPosts;

                isLoadingMore = false;
            }
        );
    }

    function generateContentLinks(postId: string, content: string): void {
        setTimeout(() => {
            const targetElement = document.getElementsByClassName(postId)[0];

            if (!targetElement) return;

            targetElement.innerHTML = linkifyHtml(content, {
                className: 'link',
                truncate: 40,
                validate: {
                    url: (value) =>
                        /^https?:\/\/[0-9a-zA-Z-.\/\?=]+/.test(value),
                },
                target: '_blank',
            });
        }, 0);
    }

    onMount(() => {
        unsubscribe = userPosts.subscribe((posts) => {
            if (!posts) return;

            setTimeout(() => {
                mountTransitionsDone = true;
            }, 500);

            setTimeout(() => {
                $userPosts?.forEach((userPost) => {
                    generateContentLinks(userPost.postId, userPost.content);
                });
            }, 100);
        });
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

{#if $profileLoadingFinished}
    <div class="posts-container" in:fade={{ duration: 200 }}>
        {#if $userData.totalPosts == 0}
            <h1 in:fade={{ duration: 500 }} id="empty-text">
                {$userData.isFollower ||
                $userData.isSelf ||
                !$userData.isPrivate
                    ? 'No posts, yet'
                    : 'This profile is private'}
            </h1>
        {:else}
            <h1 id="counter">
                <span>{$userData.totalPosts}</span> post{$userData.totalPosts !=
                1
                    ? 's'
                    : ''}
            </h1>

            {#each $userPosts as { postId, title, content, attachment, creationDate }, i}
                <div
                    class="post-container"
                    on:click={() => showViewPost(i)}
                    in:fade={{
                        duration: 500,
                        delay: !mountTransitionsDone ? 500 : 0,
                    }}
                >
                    <h1 id="title">{title}</h1>
                    <h1 id="content" class={postId}>{content}</h1>

                    {#if attachment && !$dataSaver}
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

            {#if $userPosts.length < $userData.totalPosts}
                <button id="more" on:click={loadMorePosts}>Load more</button>
            {/if}
        {/if}
    </div>
{/if}

<style>
    .posts-container {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .posts-container #counter {
        margin: 0;
        margin-bottom: 10px;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .posts-container #counter span {
        color: var(--profile_info_color);
    }

    .posts-container .post-container {
        display: flex;
        flex-direction: column;
        background: var(--accent_bg_color);
        box-shadow: 0 0 10px var(--accent_shadow_color);
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
        transition: 150ms;
        cursor: pointer;
        align-items: center;
        justify-content: center;
    }

    .post-container:hover {
        transform: scale(0.99);
    }

    .post-container:active {
        transform: scale(0.975);
    }

    .post-container #title {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin: 0;
        text-align: center;
        font-size: 2.1rem;
        width: 100%;
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

    :global(.post-container #content .link) {
        text-decoration: none;
        color: var(--text_color);
    }

    :global(.post-container #content .link:hover::after) {
        background: var(--profile_info_color);
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

    .posts-container #more {
        width: max-content;
        margin: auto;
        font-size: 2rem;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    @media screen and (max-width: 720px) {
        .posts-container #counter {
            font-size: 1.6rem;
        }

        .post-container {
            max-width: 400px;
            max-height: 450px;
        }

        .posts-container .post-container {
            cursor: default;
        }

        .post-container:hover {
            transform: none;
        }

        .post-container:active {
            transform: none;
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

        .posts-container #more {
            font-size: 1.8rem;
        }
    }

    @media screen and (max-width: 520px) {
        .posts-container #counter {
            font-size: 1.4rem;
        }

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

        .posts-container #more {
            font-size: 1.4rem;
        }
    }
</style>
