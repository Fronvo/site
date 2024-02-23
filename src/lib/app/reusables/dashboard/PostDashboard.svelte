<script lang="ts">
    import {
        differenceInDays,
        differenceInHours,
        differenceInMinutes,
        differenceInMonths,
        differenceInYears,
    } from 'date-fns';
    import type { Post } from 'interfaces/all';
    import { DropdownTypes } from 'stores/dropdowns';
    import { cachedAccountData, mousePos, socket } from 'stores/main';
    import {
        ModalTypes,
        targetImageModal,
        targetPostModal,
        targetProfileModal,
    } from 'stores/modals';
    import { onDestroy, onMount } from 'svelte';
    import {
        findCachedAccount,
        showDropdownMouse,
        showModal,
    } from 'utilities/main';

    export let post: Post;
    export let isPreview = false;

    let postData = post.post;
    let profileData = post.profileData;

    let dateSuffix: string;

    let preloaded = false;

    function updateSuffix(date: string): void {
        const date2 = new Date(date);

        const years = differenceInYears(new Date(), date2);

        const months = differenceInMonths(new Date(), date2);

        const days = differenceInDays(new Date(), date2);

        const hours = differenceInHours(new Date(), date2);

        const minutes = differenceInMinutes(new Date(), date2);

        if (years > 0) {
            dateSuffix = `${years} y`;
        } else if (months > 0) {
            dateSuffix = `${months} mo`;
        } else if (days > 0) {
            dateSuffix = `${days} d`;
        } else if (hours > 0) {
            dateSuffix = `${hours} h`;
        } else if (minutes > 0) {
            dateSuffix = `${minutes} m`;
        } else {
            dateSuffix = 'now';
        }
    }

    function showOptions(): void {
        $targetImageModal = postData.attachment;

        showDropdownMouse(DropdownTypes.Image, $mousePos);
    }

    function showImage(): void {
        if (isPreview) return;

        $targetImageModal = postData.attachment;

        showModal(ModalTypes.Image);
    }

    async function showProfile(): Promise<void> {
        if (isPreview) return;

        $targetProfileModal = await findCachedAccount(
            postData.author,
            $cachedAccountData
        );

        showModal(ModalTypes.Profile);
    }

    function likePost(): void {
        // Simulate
        if (postData.isLiked) {
            postData.isLiked = false;

            postData.totalLikes -= 1;
        } else {
            postData.isLiked = true;

            postData.totalLikes += 1;
        }

        socket.emit('likePost', {
            postId: postData.postId,
        });
    }

    function sharePost(): void {
        $targetPostModal = post;

        showModal(ModalTypes.SharePost);
    }

    onMount(() => {
        let img = new Image();
        img.src = `${post.post.attachment}/tr:w-1000:h-1000:pr-true`;

        img.onload = () => (preloaded = true);

        if (isPreview) return;

        socket.on('postLikesChanged', ({ postId, likes }) => {
            if (postData.postId == postId) {
                postData.totalLikes = likes;
            }
        });
    });

    onDestroy(() => (preloaded = false));

    $: updateSuffix(postData.creationDate);
</script>

<div
    class={`post-container ${!preloaded ? 'preloading' : ''} ${
        isPreview ? 'preview' : ''
    }`}
>
    <div class="top">
        <img
            on:click={showProfile}
            on:keydown={showProfile}
            id="avatar"
            src={profileData.avatar
                ? `${profileData.avatar}/tr:w-72:h-72`
                : '/images/avatar.png'}
            draggable={false}
            alt={`${postData.author}\'s avatar'`}
        />
        <h1 id="name">{postData.author}</h1>

        <h1 id="time">• {dateSuffix}</h1>
    </div>

    <!-- Ambiency in the future? -->
    <img
        class="attachment"
        src={`${post.post.attachment}/tr:w-1000:h-1000:pr-true`}
        on:click={showImage}
        on:keydown={showImage}
        on:contextmenu={(ev) => {
            if (isPreview) return;

            showOptions();

            ev.preventDefault();
        }}
        draggable={false}
        alt={`${post.profileData.profileId}\'s post'`}
    />

    <div class="action">
        {#if postData.isLiked}
            <svg
                on:click={likePost}
                on:keydown={likePost}
                id="like"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 48 48"
                ><path
                    fill="red"
                    stroke="red"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
                /></svg
            >
        {:else}
            <svg
                on:click={likePost}
                on:keydown={likePost}
                id="like"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 48 48"
                ><path
                    fill="none"
                    stroke="red"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
                /></svg
            >
        {/if}

        <h1 id="likes">
            {postData.totalLikes} like{postData.totalLikes != 1 ? 's' : ''}
        </h1>

        <!-- <svg
            on:click={sharePost}
            on:keydown={sharePost}
            id="send"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m14 10l-3 3m9.288-9.969a.535.535 0 0 1 .68.681l-5.924 16.93a.535.535 0 0 1-.994.04l-3.219-7.242a.535.535 0 0 0-.271-.271l-7.242-3.22a.535.535 0 0 1 .04-.993z"
            /></svg
        > -->
    </div>
</div>

<style>
    .post-container {
        width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 50px;
        padding-bottom: 50px;
        border-bottom: 1px solid var(--tertiary);
        margin-right: 20px;
        margin-left: 20px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        transition: 100ms filter, 100ms background;
        user-select: none;
    }

    .preloading {
        visibility: hidden;
    }

    .preview {
        border: none;
    }

    .top {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 5px;
    }

    h1 {
        margin: 0;
    }

    #avatar {
        width: 32px;
        height: 32px;
        border-radius: 100px;
        margin-right: 10px;
        cursor: pointer;
    }

    .preview #avatar {
        cursor: default;
    }

    #name {
        font-size: 1rem;
        font-weight: 700;
        margin-right: 2px;
        margin-top: 2px;
    }

    #time {
        font-size: 0.85rem;
        color: var(--gray);
        flex: 1;
        margin-top: 4px;
    }

    .attachment {
        min-width: 100%;
        max-width: 100%;
        max-height: 90%;
        cursor: pointer;
        border: 1px solid var(--primary);
        border-radius: 5px;
    }

    .preview .attachment {
        cursor: default;
    }

    h1 {
        font-size: 1.5rem;
        color: var(--text);
        margin: 0;
        transform: translateY(-2px);
    }

    .action {
        width: 99%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 5px;
    }

    .preview .action {
        display: none;
    }

    svg {
        width: 30px;
        height: 30px;
        transition: 175ms;
        margin-right: 7px;
    }

    svg:active {
        transform: scale(0.95);
        opacity: 0.75;
    }

    #likes {
        opacity: 0;
        font-size: 1.05rem;
        font-weight: 600;
        margin-top: 5px;
        flex: 1;
        letter-spacing: 0.1px;
    }

    @media screen and (max-width: 850px) {
        .post-container {
            width: 275px;
        }

        #name {
            font-size: 0.9rem;
        }

        #time {
            font-size: 0.75rem;
        }
    }
</style>
