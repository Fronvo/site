<script lang="ts">
    import type { FronvoAccount } from 'interfaces/app/main';
    import { fade } from 'svelte/transition';

    export let info: FronvoAccount;

    function formatPostDate(postDate?: string): string {
        return new Date(postDate ? postDate : Date.now()).toLocaleDateString(
            undefined,
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
            }
        );
    }
</script>

{#if info}
    <div class="posts-container" in:fade={{ delay: 1300 }}>
        {#if info.posts.length == 0}
            <h1 in:fade={{ duration: 500, delay: 700 }} id="empty-text">
                No posts, yet
            </h1>
        {:else}
            {#each info.posts as { title, message, creationDate }, i}
                <!-- TODO: Saos fade in, same delay -->
                <div in:fade={{ duration: 500, delay: 500 + (i + 5) * 100 }}>
                    <h1 id="title">{title}</h1>
                    <h1 id="message">{message}</h1>
                    <h1 id="creation-date">{formatPostDate(creationDate)}</h1>

                    <!-- TODO: Action layout for likes, sharing, comments -->
                </div>
            {/each}
        {/if}
    </div>
{/if}

<style>
    .posts-container {
        margin-top: 20px;
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
        max-height: 300px;
        border-radius: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: 150ms box-shadow;
        cursor: pointer;
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

    .posts-container div #message {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        margin: 0;
        margin-top: 10px;
        font-size: 1.8rem;
        color: var(--theme-profile_info_color);
        flex: 1;
    }

    .posts-container div #creation-date {
        font-size: 1.3rem;
        margin: 0;
        margin-top: 20px;
    }

    .posts-container #empty-text {
        margin: 0;
        font-size: 2.2rem;
    }

    @media screen and (max-width: 720px) {
        .posts-container #empty-text {
            font-size: 2rem;
        }
    }

    @media screen and (max-width: 520px) {
        .posts-container #empty-text {
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 720px) {
        .posts-container div {
            max-width: 400px;
            max-height: 250px;
            cursor: default;
        }

        .posts-container div:hover {
            box-shadow: 0 0 10px var(--theme-nav_shadow_color);
        }

        .posts-container div #title {
            font-size: 2rem;
        }

        .posts-container div #message {
            font-size: 1.7rem;
            -webkit-line-clamp: 4;
        }

        .posts-container div #creation-date {
            font-size: 1.2rem;
        }
    }

    @media screen and (max-width: 520px) {
        .posts-container div {
            max-width: 300px;
            max-height: 200px;
        }

        .posts-container div #title {
            font-size: 1.7rem;
        }

        .posts-container div #message {
            font-size: 1.5rem;
            -webkit-line-clamp: 3;
        }

        .posts-container div #creation-date {
            font-size: 1.1rem;
        }
    }
</style>
