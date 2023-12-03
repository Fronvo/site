<script lang="ts">
    import {
        differenceInDays,
        differenceInHours,
        differenceInMinutes,
        differenceInMonths,
        differenceInYears,
    } from 'date-fns';
    import type { Post } from 'interfaces/all';
    import { socket } from 'stores/main';
    import {
        ModalTypes,
        targetImageModal,
        targetProfileModal,
    } from 'stores/modals';
    import { onMount } from 'svelte';
    import { showModal } from 'utilities/main';

    export let post: Post;
    let postContainer: HTMLDivElement;
    let ambiency: HTMLDivElement;

    let postData = post.post;
    let profileData = post.profileData;

    let dateSuffix: string;

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

    function showImage(): void {
        $targetImageModal = postData.attachment;

        showModal(ModalTypes.Image);
    }

    function showProfile(): void {
        $targetProfileModal = profileData;

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

    onMount(() => {
        socket.on('postLikesChanged', ({ postId, likes }) => {
            if (postData.postId == postId) {
                postData.totalLikes = likes;
            }
        });
    });

    onMount(() => {
        setTimeout(() => {
            if (postContainer) {
                postContainer.style.backgroundImage = `url(${postData.attachment})`;
            }

            if (ambiency) {
                ambiency.style.backgroundImage = `url(${postData.attachment})`;
            }
        }, 0);
    });

    $: updateSuffix(postData.creationDate);
</script>

<div class="post-container">
    <div class="top">
        <img
            on:click={showProfile}
            on:keydown={showProfile}
            id="avatar"
            src={profileData.avatar ? profileData.avatar : '/images/avatar.svg'}
            draggable={false}
            alt={`${postData.author}\'s avatar'`}
        />
        <h1 id="name">{postData.author}</h1>

        <h1 id="time">• {dateSuffix}</h1>
    </div>

    <div class="attachments">
        <!-- Ambiency -->
        <div
            class="attachment"
            bind:this={postContainer}
            on:click={showImage}
            on:keydown={showImage}
        />

        <div class="attachment-ambiency" bind:this={ambiency} />
    </div>

    <div class="action">
        {#if postData.isLiked}
            <svg
                on:click={likePost}
                on:keydown={likePost}
                id="like"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137Z"
                /></svg
            >
        {:else}
            <svg
                on:click={likePost}
                on:keydown={likePost}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    d="m8.962 18.91l.464-.588l-.464.589ZM12 5.5l-.54.52a.75.75 0 0 0 1.08 0L12 5.5Zm3.038 13.41l.465.59l-.465-.59Zm-5.612-.588C7.91 17.127 6.253 15.96 4.938 14.48C3.65 13.028 2.75 11.334 2.75 9.137h-1.5c0 2.666 1.11 4.7 2.567 6.339c1.43 1.61 3.254 2.9 4.68 4.024l.93-1.178ZM2.75 9.137c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137h1.5ZM8.497 19.5c.513.404 1.063.834 1.62 1.16c.557.325 1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043L8.497 19.5Zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.197-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842l.929 1.178ZM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713h1.5Zm-8.176 9.185c-.526.415-.995.779-1.448 1.043c-.452.264-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16l-.929-1.178Z"
                /></svg
            >
        {/if}

        <h1 id="likes">
            {postData.totalLikes} like{postData.totalLikes != 1 ? 's' : ''}
        </h1>
    </div>
</div>

<style>
    .post-container {
        min-width: 500px;
        min-height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
        margin-right: 20px;
        margin-left: 20px;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 10px;
        transition: 100ms filter, 100ms background;
        user-select: none;
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
        width: 36px;
        height: 36px;
        border-radius: 100px;
        margin-right: 5px;
        cursor: pointer;
    }

    #name {
        font-size: 1.1rem;
        margin-right: 2px;
    }

    #time {
        font-size: 0.9rem;
        color: var(--gray);
        margin-top: 2px;
    }

    .attachments {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .attachment {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 5px;
        transition: 100ms filter, 100ms background;
        z-index: 1;
        cursor: pointer;
    }

    .attachment-ambiency {
        width: 100%;
        height: 100%;
        z-index: 0;
        filter: blur(10px);
        /* TODO */
        display: none;
    }

    h1 {
        font-size: 1.5rem;
        color: white;
        margin: 0;
        transform: translateY(-2px);
        text-shadow: 0 0 10px black;
    }

    .action {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 5px;
    }

    svg {
        width: 30px;
        height: 30px;
        transition: 175ms;
        margin-right: 7px;
        fill: red;
    }

    svg:active {
        transform: scale(0.95);
        opacity: 0.75;
    }

    #likes {
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        margin-top: 2px;
    }
</style>
