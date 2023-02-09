<script lang="ts">
    import linkifyHtml from 'linkify-html';
    import { dataSaver, socket } from 'stores/all';
    import {
        postModalForHome,
        postModalIndex,
        postModalInfo,
    } from 'stores/main';
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
    import { getKey } from 'utilities/global';
    import { setProgressBar, showModal } from 'utilities/main';

    let mountTransitionsDone = false;
    let unsubscribe: Unsubscriber;
    let isLoadingMore = false;

    function showViewPost(postIndex: number): void {
        $postModalInfo = $userPosts[postIndex];
        $postModalForHome = false;

        // For deletePost
        $postModalIndex = postIndex;

        showModal(ModalTypes.ViewPost);
    }

    function loadMorePosts(): void {
        if (isLoadingMore) return;

        isLoadingMore = true;
        setProgressBar(true);

        socket.emit(
            'fetchProfilePosts',
            {
                profileId: $userData.profileId,
                from: $userPosts.length.toString(),
                to: ($userPosts.length + 10).toString(),
            },
            ({ profilePosts }) => {
                const tempPosts = $userPosts;
                tempPosts.push(...profilePosts);

                $userPosts = tempPosts;

                isLoadingMore = false;
                setProgressBar(false);
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
        {#if $userData.totalPosts == 0 || !getKey('token')}
            <h1 in:fade={{ duration: 500 }} id="empty-text">
                <!-- Private account -->
                {#if $userData.isPrivate}
                    <!-- Logged in, viewing private account -->
                    {#if getKey('token')}
                        This profile is private

                        <!-- Guest, viewing private account -->
                    {:else}
                        {'This profile is private'}
                        {'\nJoin Fronvo to follow'}
                        <span>{$userData.username}</span>
                    {/if}
                {:else}
                    <!-- Logged in, viewing public account with no posts -->
                    {#if getKey('token')}
                        No posts, yet

                        <!-- Guest, viewing public account with (maybe) no posts, guest can't know, no endpoint -->
                    {:else}
                        {'Join Fronvo to see'}
                        <span>{$userData.username}</span>'s posts
                    {/if}
                {/if}
            </h1>

            {#if !getKey('token')}
                <button
                    id="join"
                    in:fade={{ duration: 500 }}
                    on:click={() => showModal(ModalTypes.JoinFronvo)}
                    >Join Fronvo</button
                >
            {/if}
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
        font-size: 1.7rem;
    }

    .posts-container #counter span {
        color: var(--profile_info_color);
    }

    .posts-container .post-container {
        display: flex;
        flex-direction: column;
        background: transparent;
        margin-bottom: 25px;
        width: 550px;
        background: transparent;
        box-shadow: 0 0 15px var(--accent_shadow_color);
        max-height: 650px;
        border-radius: 10px;
        padding: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: 150ms;
        cursor: pointer;
        align-items: center;
    }

    .post-container:hover {
        background: var(--accent_bg_color);
        box-shadow: 0 0 10px var(--accent_shadow_color);
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
        font-size: 1.9rem;
        margin-right: 5px;
        margin-left: 5px;
    }

    .post-container #content {
        display: -webkit-box;
        overflow: hidden;
        max-width: 100%;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        margin: 0;
        margin-right: 5px;
        margin-left: 5px;
        font-size: 1.5rem;
        color: var(--profile_info_color);
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
        max-height: 350px;
        margin-top: 5px;
    }

    .post-container #creation-date {
        font-size: 1.3rem;
        margin: 0;
        margin-top: 10px;
    }

    .posts-container #empty-text {
        margin: 0;
        font-size: 1.7rem;
        white-space: pre-wrap;
        text-align: center;
    }

    .posts-container #empty-text span {
        color: var(--profile_info_color);
    }

    .posts-container #join {
        width: max-content;
        font-size: 2rem;
        margin: auto;
        margin-top: 10px;
    }

    .posts-container #more {
        width: max-content;
        margin: auto;
        font-size: 1.8rem;
        margin-bottom: 60px;
        margin-top: 20px;
    }

    @media screen and (max-width: 720px) {
        .posts-container #counter {
            font-size: 1.6rem;
        }

        .post-container {
            max-width: 400px;
            max-height: 500px;
            cursor: default;
        }

        .posts-container .post-container {
            cursor: default;
        }

        .post-container:hover {
            background: transparent;
            box-shadow: 0 0 15px var(--accent_shadow_color);
        }

        .post-container:active {
            transform: none;
        }

        .post-container #title {
            font-size: 1.6rem;
        }

        .post-container #content {
            font-size: 1.3rem;
            -webkit-line-clamp: 4;
        }

        .post-container #attachment {
            max-height: 250px;
        }

        .post-container #creation-date {
            font-size: 1.2rem;
        }

        .posts-container #more {
            font-size: 1.6rem;
        }

        .posts-container #empty-text {
            font-size: 1.7rem;
            margin-left: 10px;
            margin-right: 10px;
        }

        .posts-container #join {
            font-size: 1.4rem;
            margin-bottom: 75px;
        }
    }

    @media screen and (max-width: 520px) {
        .posts-container {
            margin-bottom: 75px;
        }

        .posts-container #counter {
            font-size: 1.4rem;
        }

        .post-container {
            max-width: 300px;
            max-height: 450px;
            margin-bottom: 25px;
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

        .posts-container #more {
            font-size: 1.4rem;
            margin-bottom: 50px;
        }

        .posts-container #empty-text {
            font-size: 1.4rem;
        }

        .posts-container #join {
            font-size: 1.3rem;
        }
    }
</style>
