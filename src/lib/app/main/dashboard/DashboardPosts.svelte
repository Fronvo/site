<script lang="ts">
    import { isMobile, socket } from 'stores/main';
    import {
        dashboardPosts as dashboardPostsStore,
        totalDashboardPosts,
    } from 'stores/dashboard';
    import InfiniteLoading from 'svelte-infinite-loading';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { ourData } from 'stores/profile';
    import PropPost from '$lib/app/reusables/dashboard/PropPost.svelte';
    import { sineInOut } from 'svelte/easing';
    import PostDashboard from '$lib/app/reusables/dashboard/PostDashboard.svelte';
    import { setTitle } from 'utilities/main';

    function reloadPosts(): void {
        socket.emit(
            'fetchDashboard',
            {
                from: '0',
                to: '20',
            },
            ({ dashboard, totalPosts }) => {
                $dashboardPostsStore = [];

                setTimeout(() => {
                    $dashboardPostsStore = dashboard;
                    $totalDashboardPosts = totalPosts;
                }, 0);
            }
        );
    }

    async function loadMore({ detail: { loaded, complete } }): Promise<void> {
        socket.emit(
            'fetchDashboard',
            {
                from: $dashboardPostsStore.length.toString(),
                to: ($dashboardPostsStore.length + 15).toString(),
            },
            ({ dashboard }) => {
                if (dashboard.length == 0) {
                    complete();
                } else {
                    const tempPosts = $dashboardPostsStore;
                    tempPosts.push(...dashboard);

                    $dashboardPostsStore = tempPosts;

                    loaded();
                }
            }
        );
    }

    onMount(() => {
        setTitle('Homepage');

        socket.off('postShared');

        socket.on('postShared', ({ author }) => {
            if (author == $ourData.profileId) return;

            reloadPosts();
        });
    });
</script>

<div
    class={`home-container ${$isMobile ? 'mobile' : ''}`}
    in:fade={{ duration: 200, easing: sineInOut }}
>
    {#if $dashboardPostsStore.length != 0}
        <h1 id="title">Latest posts</h1>
        <div class="posts-container">
            {#if $dashboardPostsStore}
                {#each $dashboardPostsStore as post}
                    <PostDashboard {post} />
                {/each}

                <InfiniteLoading
                    distance={1000}
                    on:infinite={loadMore}
                    direction="bottom"
                >
                    <div slot="noMore" />
                    <div slot="noResults" />
                    <div slot="error" />
                    <div slot="spinner" />
                </InfiniteLoading>
            {/if}
        </div>
    {:else}
        <div class="empty">
            <div class="banner">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    ><path
                        d="m13.039 18.386l.267-.088c2.298-.767 3.447-1.15 3.66-2.056c.215-.906-.642-1.763-2.355-3.475l-1.689-1.69l-.005.015l-.082.267c-.068.23-.16.55-.251.916c-.187.75-.357 1.622-.357 2.28c0 .658.17 1.531.357 2.28a20.952 20.952 0 0 0 .356 1.253l.005.017l.002.004l.092.277Zm-5.567 1.855c-2.262.746-3.454 1.058-4.113.399c-.73-.73-.269-2.113.653-4.878l1.69-5.069c.632-1.896 1.003-3.01 1.622-3.461l-.005.025a26.244 26.244 0 0 0-.138.73a51.15 51.15 0 0 0-.31 1.939c-.216 1.533-.415 3.492-.312 5.057c.062.948.259 2.123.435 3.04a50.537 50.537 0 0 0 .312 1.503l.02.093l.146.622ZM8.85 7.259l-.05.245v.003l-.003.009l-.007.037a24.51 24.51 0 0 0-.133.7a49.64 49.64 0 0 0-.301 1.881c-.213 1.515-.393 3.347-.3 4.751c.055.85.237 1.95.41 2.857a48.913 48.913 0 0 0 .303 1.455l.02.088l.005.022l.107.459l2.715-.905l-.103-.309a9.929 9.929 0 0 1-.115-.37c-.073-.247-.171-.59-.27-.983c-.192-.77-.401-1.792-.401-2.644c0-.852.21-1.874.401-2.643a22.305 22.305 0 0 1 .385-1.354l.01-.027l.212-.64l-.503-.503C10.19 8.344 9.463 7.618 8.85 7.259Zm2.076-4.899a.75.75 0 0 1 .25 1.031a.65.65 0 0 0 .094.8l.098.098c.589.588.806 1.453.565 2.25a.75.75 0 1 1-1.436-.434a.758.758 0 0 0-.19-.756l-.098-.098a2.15 2.15 0 0 1-.314-2.642a.75.75 0 0 1 1.031-.249Zm2.635 2.037c.201-.201.302-.302.418-.339a.5.5 0 0 1 .302 0c.116.037.217.138.418.339c.2.2.301.301.338.417a.5.5 0 0 1 0 .303c-.037.116-.137.216-.338.417c-.201.201-.302.302-.418.339a.5.5 0 0 1-.302 0c-.116-.037-.217-.138-.418-.339c-.201-.2-.302-.301-.338-.417a.5.5 0 0 1 0-.303c.036-.116.137-.216.338-.417ZM6.927 3.94a.536.536 0 1 1 .759.76a.536.536 0 0 1-.759-.76Zm13.048 3.107c-.139.053-.261.176-.507.421c-.245.246-.368.368-.421.507a.7.7 0 0 0 0 .503c.053.138.176.261.421.507c.246.245.368.368.507.421a.7.7 0 0 0 .503 0c.138-.053.261-.176.507-.421c.245-.246.368-.369.421-.507a.7.7 0 0 0 0-.503c-.053-.139-.176-.261-.421-.507c-.246-.245-.369-.368-.507-.421a.7.7 0 0 0-.503 0Zm-.917 8.266a.536.536 0 1 1 .759.759a.536.536 0 0 1-.759-.759ZM17.69 4.722a.75.75 0 0 1 .588.882l-.144.72a2.82 2.82 0 0 1-1.871 2.12a1.312 1.312 0 0 0-.874.99l-.144.72a.75.75 0 0 1-1.471-.295l.144-.72c.198-.99.912-1.8 1.87-2.119c.448-.15.782-.527.875-.99l.144-.72a.75.75 0 0 1 .882-.588Zm3.718 7.838a1.013 1.013 0 0 0-1.078.17a2.513 2.513 0 0 1-2.923.296l-.213-.123a.75.75 0 0 1 .75-1.299l.213.123c.377.218.852.17 1.178-.12a2.513 2.513 0 0 1 2.674-.422l.292.128a.75.75 0 0 1-.601 1.374l-.292-.127ZM17.5 9.742a.536.536 0 1 1 .759.758a.536.536 0 0 1-.759-.758Z"
                    /></svg
                >

                <h1>When your friends post content, it will appear here!</h1>
            </div>

            <div class="props">
                {#each { length: 2 } as _, i}
                    <PropPost opacity={1 - i * 0.5} />
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    h1 {
        margin: 0;
        font-size: 1.7rem;
        text-align: center;
        font-weight: 500;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding-right: 150px;
        color: var(--text);
    }

    .home-container {
        display: flex;
        flex-direction: column;
        width: max-content;
        height: 100%;
        margin-left: 15px;
        margin: auto;
    }

    .posts-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateY(-20px);
    }

    #title {
        width: 100%;
        font-size: 1.5rem;
        text-align: center;
        padding-right: 0;
        margin: 0;
        padding-top: 10px;
    }

    .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        justify-content: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-top: 5px;
    }

    .banner {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        margin-left: 160px;
        margin-bottom: 10px;
    }

    .banner h1 {
        margin: 0;
        font-size: 1.3rem;
    }

    .banner svg {
        width: 30px;
        height: 30px;
        min-width: 30px;
        min-height: 30px;
        fill: var(--text);
        margin-right: 10px;
        cursor: default;
    }

    .props {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        height: 100%;
    }

    @media screen and (max-width: 1050px) {
        .empty {
            width: 100%;
        }

        .banner {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 0px;
            visibility: hidden;
        }

        .mobile .banner {
            visibility: visible;
            margin-left: 80px;
        }

        .props {
            margin-right: 50px;
        }

        .banner h1 {
            font-size: 1.1rem;
        }
    }

    @media screen and (max-width: 850px) {
        .home-container {
            width: 100%;
            align-items: center;
            margin-left: 0;
        }

        .posts-container {
            align-items: center;
            transform: translateY(-30px);
            padding-bottom: 120px;
        }

        #title {
            font-size: 1.2rem;
        }

        .mobile .banner {
            margin-left: 120px;
        }

        .mobile .banner h1 {
            font-size: 0.9rem;
        }

        .mobile .props {
            margin-right: 0;
        }
    }
</style>
