<script lang="ts">
    import type { HomePost } from 'interfaces/all';
    import type { AccountPost, FronvoAccount } from 'interfaces/all';
    import { dismissModal, fetchPosts } from 'utilities/main';
    import { postModalForHome, postModalInfo } from 'stores/main';
    import { userData, userPosts } from 'stores/profile';
    import { socket } from 'stores/all';
    import Time from 'svelte-time';
    import DeleteChatOption from '$lib/svgs/DeleteChatOption.svelte';
    import { onMount } from 'svelte';
    import linkifyHtml from 'linkify-html';
    import { loadProfilePanel } from 'utilities/profile';

    function deletePost(): void {
        dismissModal();

        socket.emit(
            'deletePost',
            { postId: ($postModalInfo as AccountPost).postId },
            async ({ err }) => {
                if (!err) {
                    $userPosts = await fetchPosts(undefined);
                }
            }
        );
    }

    async function viewProfile(): Promise<void> {
        // No need to revisit from the profile panel
        if (!$postModalForHome) return;

        dismissModal();

        await loadProfilePanel(
            ($postModalInfo as HomePost).profileData.profileId
        );
    }

    function getPostData(): AccountPost {
        if ($postModalForHome) {
            return ($postModalInfo as HomePost).post;
        }
        return $postModalInfo as AccountPost;
    }

    function getUserData(): FronvoAccount {
        if ($postModalForHome) {
            return ($postModalInfo as HomePost).profileData;
        }
        return $userData;
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
        generateContentLinks(getPostData().postId, getPostData().content);
    });
</script>

<div class="view-container">
    <div class="by-container" on:click={viewProfile}>
        <h1 id="author">By {getUserData().username}</h1>
        <img
            id="avatar"
            src={getUserData().avatar
                ? getUserData().avatar
                : '/svgs/profile/default.svg'}
            draggable={false}
            alt={`${getUserData().username}'s avatar`}
        />
    </div>

    <div class="data-container">
        <h1 id="title">{getPostData().title}</h1>

        <h1 id="content" class={getPostData().postId}>
            {getPostData().content}
        </h1>

        {#if getPostData().attachment}
            <img
                id="attachment"
                src={getPostData().attachment}
                alt={`'${getPostData().title}' attachment`}
                draggable={false}
            />
        {/if}

        <h1 id="creation-date">
            <!-- Updates every 15 seconds -->
            <Time
                format={'dddd HH:mm · MMMM D YYYY'}
                live={15000}
                timestamp={getPostData().creationDate}
            />
        </h1>

        <!-- Hide if HomePost -->
        {#if getUserData().isSelf && !$postModalForHome}
            <hr />

            <div class="actions-container">
                <DeleteChatOption callback={deletePost} />
            </div>
        {/if}
    </div>

    <div class="options-container">
        <button
            on:click={() => {
                dismissModal();
            }}>Close</button
        >
    </div>
</div>

<style>
    hr {
        width: 200px;
    }

    .view-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        background: var(--modal_bg_color_full);
        overflow-y: auto;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 75%;
        min-width: 500px;
        flex: 1;
        margin-bottom: 10px;
    }

    .by-container {
        display: flex;
        align-items: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 10px;
    }

    .by-container #author {
        color: var(--profile_info_color);
        margin: 0;
        font-size: 2.5rem;
        padding: 5px;
    }

    .by-container #avatar {
        width: 64px;
        height: 64px;
        padding: 5px;
        border-radius: 10px;
    }

    .data-container #title {
        margin: 0;
        text-align: center;
        font-size: 3rem;
    }

    .data-container #content {
        margin: 0;
        font-size: 2rem;
        color: var(--profile_info_color);
        white-space: pre-wrap;
        text-align: center;
        max-width: 100%;
    }

    :global(.data-container #content .link) {
        text-decoration: none;
        color: var(--text_color);
    }

    :global(.data-container #content .link:hover::after) {
        background: var(--profile_info_color);
    }

    .data-container #attachment {
        max-width: 70%;
        max-height: 70%;
        margin-top: 10px;
        border-radius: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .data-container #creation-date {
        font-size: 1.6rem;
        margin: 0;
        margin-top: 20px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .actions-container {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .options-container {
        display: flex;
        margin-bottom: 15px;
    }

    .options-container button {
        font-size: 2.2rem;
    }

    @media screen and (max-width: 720px) {
        .data-container {
            width: 400px;
            min-width: auto;
        }

        .by-container #author {
            font-size: 2.2rem;
        }

        .data-container #title {
            font-size: 2.4rem;
        }

        .data-container #content {
            font-size: 1.7rem;
            max-width: none;
        }

        .data-container #attachment {
            max-width: 100%;
            max-height: 512px;
        }

        .data-container #creation-date {
            font-size: 1.5rem;
        }

        .options-container button {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .data-container {
            width: 300px;
        }

        .by-container #author {
            font-size: 1.9rem;
        }

        .by-container #avatar {
            width: 48px;
            height: 48px;
        }

        .data-container #title {
            font-size: 2rem;
        }

        .data-container #content {
            font-size: 1.6rem;
        }

        .data-container #attachment {
            max-width: 100%;
            max-height: 100%;
        }

        .data-container #creation-date {
            font-size: 1.2rem;
        }

        .options-container button {
            font-size: 1.5rem;
        }
    }
</style>
