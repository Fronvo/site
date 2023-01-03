<script lang="ts">
    import linkifyHtml from 'linkify-html';
    import { dataSaver } from 'stores/all';
    import { homePosts } from 'stores/home';
    import { postModalForHome, postModalInfo } from 'stores/main';
    import { onMount } from 'svelte';
    import Time from 'svelte-time';
    import { fade, scale } from 'svelte/transition';
    import { ModalTypes } from 'types/main';
    import { showModal } from 'utilities/main';

    const posts = homePosts;

    onMount(() => {
        setupContentLinks();
    });

    function setupContentLinks(): void {
        $homePosts.forEach((homePost) => {
            generateContentLinks(homePost.post.postId, homePost.post.content);
        });
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

    function viewPost(postIndex: number): void {
        $postModalInfo = $homePosts[postIndex];
        $postModalForHome = true;
        showModal(ModalTypes.ViewPost);
    }
</script>

<div class="posts-container" in:fade={{ duration: 300, delay: 200 }}>
    {#each $posts as { post, profileData }, i}
        <div
            on:click={() => viewPost(i)}
            in:scale={{ duration: 500, delay: Math.min(i * 50, 500) }}
            class="post-container"
        >
            <div class="author-container">
                <img
                    id="avatar"
                    src={profileData.avatar && !$dataSaver
                        ? profileData.avatar
                        : '/svgs/profile/avatar.svg'}
                    draggable={false}
                    alt={`${profileData.username}'s avatar`}
                />
                <h1 id="author">{profileData.username}</h1>
            </div>

            <h1 id="title">{post.title}</h1>
            <h1 id="content" class={post.postId}>{post.content}</h1>

            {#if post.attachment && !$dataSaver}
                <img
                    id="attachment"
                    src={post.attachment}
                    alt={`'${post.title}' attachment`}
                    draggable={false}
                />
            {/if}

            <h1 id="creation-date">
                <Time
                    relative
                    format={'dddd HH:mm · MMMM D YYYY'}
                    live={60000}
                    timestamp={post.creationDate}
                />
            </h1>
        </div>
    {/each}
</div>

<style>
    .posts-container {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .post-container {
        display: flex;
        flex-direction: column;
        background: var(--accent_bg_color);
        box-shadow: 0 0 10px var(--accent_shadow_color);
        padding: 0px;
        padding-top: 5px;
        padding-bottom: 5px;
        margin-right: 10px;
        margin-left: 10px;
        margin-bottom: 50px;
        width: 450px;
        max-width: 600px;
        max-height: 650px;
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
    }

    .post-container:hover {
        transform: scale(0.99);
    }

    .post-container:active {
        transform: scale(0.975);
    }

    .author-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .author-container #avatar {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        margin-right: 10px;
    }

    .author-container #author {
        color: var(--profile_info_color);
        font-size: 2.5rem;
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
        width: 100%;
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
        margin-top: 10px;
        margin-right: 5px;
        margin-left: 5px;
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
    }

    .post-container #creation-date {
        font-size: 1.3rem;
        margin: 0;
        margin-top: 20px;
    }

    @media screen and (max-width: 720px) {
        .posts-container {
            flex-direction: column;
        }

        .post-container {
            max-width: 400px;
            max-height: 500px;
            cursor: default;
        }

        .post-container:hover {
            transform: none;
        }

        .post-container:active {
            transform: none;
        }

        .author-container {
            margin-bottom: 5px;
        }

        .author-container #avatar {
            width: 64px;
            height: 64px;
        }

        .author-container #author {
            font-size: 2.2rem;
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
    }

    @media screen and (max-width: 520px) {
        .post-container {
            max-width: 300px;
            max-height: 450px;
            margin-bottom: 25px;
        }

        .author-container #avatar {
            width: 48px;
            height: 48px;
        }

        .author-container #author {
            font-size: 1.9rem;
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
    }
</style>
