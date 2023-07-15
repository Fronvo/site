<script lang="ts">
    import type { Post } from 'interfaces/all';
    import { ourData } from 'stores/profile';
    import { showModal } from 'utilities/main';
    import {
        ModalTypes,
        targetImageModal,
        targetProfileModal,
    } from 'stores/modals';
    import {
        differenceInDays,
        differenceInHours,
        differenceInMinutes,
        differenceInMonths,
        differenceInSeconds,
        differenceInYears,
    } from 'date-fns';
    import Like from '$lib/svgs/Like.svelte';
    import { onMount } from 'svelte';
    import { socket } from 'stores/main';

    export let post: Post;
    export let small = false;

    let profileData = post.profileData;
    let postData = post.post;

    let lastMessageSuffix: string;

    let likes: HTMLHeadingElement;

    function updateSuffix(date: string): void {
        const date2 = new Date(date);

        const years = differenceInYears(new Date(), date2);

        const months = differenceInMonths(new Date(), date2);

        const days = differenceInDays(new Date(), date2);

        const hours = differenceInHours(new Date(), date2);

        const minutes = differenceInMinutes(new Date(), date2);

        const seconds = differenceInSeconds(new Date(), date2);

        if (years > 0) {
            lastMessageSuffix = `${years} y`;
        } else if (months > 0) {
            lastMessageSuffix = `${months} mo`;
        } else if (days > 0) {
            lastMessageSuffix = `${days} d`;
        } else if (hours > 0) {
            lastMessageSuffix = `${hours} h`;
        } else if (minutes > 0) {
            lastMessageSuffix = `${minutes} m`;
        } else {
            lastMessageSuffix = `${seconds} s`;
        }
    }

    function updateLikes(newLikes: number): void {
        setTimeout(() => {
            if (!likes) return;

            likes.style.transform = `translateY(${
                postData.isLiked ? '-' : ''
            }5px)`;

            setTimeout(() => {
                likes.textContent = `${newLikes}`;
            }, 100);

            setTimeout(() => {
                likes.style.transform = 'translateY(0px)';
            }, 250);
        }, 0);
    }

    function showProfileModal(): void {
        if (small) return;

        if (profileData.profileId == $ourData.profileId) {
            $targetProfileModal = $ourData;
        } else {
            $targetProfileModal = profileData;
        }

        showModal(ModalTypes.Profile);
    }

    function showImage(): void {
        if (small) return;

        $targetImageModal = postData.attachment;

        showModal(ModalTypes.Image);
    }

    function likePost(): void {
        // Simulate
        if (postData.isLiked) {
            postData.isLiked = false;

            postData.totalLikes -= 1;

            updateLikes(postData.totalLikes);
        } else {
            postData.isLiked = true;

            postData.totalLikes += 1;

            updateLikes(postData.totalLikes);
        }

        socket.emit('likePost', {
            postId: postData.postId,
        });
    }

    onMount(() => {
        socket.on('postLikesChanged', ({ postId, likes }) => {
            if (postData.postId == postId) {
                likes != postData.totalLikes && updateLikes(likes);
            }
        });
    });

    $: updateSuffix(postData.creationDate);
</script>

<div class={`post-container ${small ? 'small' : ''}`}>
    {#if profileData.avatar}
        <img
            id="avatar"
            draggable={false}
            src={profileData.avatar}
            alt={`${profileData.username}'s avatar`}
            on:click={showProfileModal}
            on:keydown={showProfileModal}
        />
    {:else}
        <svg
            id="avatar"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
            on:click={showProfileModal}
            on:keydown={showProfileModal}
            ><path
                fill="var(--text)"
                d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z"
            /></svg
        >{/if}

    <div class="wrapper">
        <div class="post-info-container">
            <h1 id="name">{profileData.profileId}</h1>

            <h1 id="time">{lastMessageSuffix}</h1>
        </div>

        <div class="post-wrapper">
            {#if postData.content}
                <h1 id="content">
                    {postData.content}
                </h1>
            {/if}

            {#if postData.attachment}
                <img
                    id="attachment"
                    src={postData.attachment}
                    draggable={false}
                    alt={'Post attachment'}
                    on:click={showImage}
                    on:keydown={showImage}
                />
            {/if}
        </div>

        <div class="action-container">
            <Like callback={likePost} liked={postData.isLiked} />

            <h1 bind:this={likes} id="likes">{postData.totalLikes}</h1>
        </div>
    </div>
</div>

<style>
    .post-container {
        width: 600px;
        display: flex;
        align-items: start;
        align-self: center;
        margin-top: 0px;
        cursor: default;
        padding-bottom: 5px;
        padding-top: 10px;
        border: 1px solid var(--primary);
        border-top: none;
        padding-left: 15px;
        padding-right: 15px;
        transition: 150ms background;
    }

    .post-container:hover {
        background: var(--post);
    }

    .small {
        width: 600px;
        justify-content: start;
        align-items: start;
    }

    .small:hover {
        background: transparent;
        cursor: default;
    }

    #avatar {
        width: 40px;
        height: 40px;
        border-radius: 30px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        transition: 150ms;
    }

    #avatar:hover {
        opacity: 0.75;
    }

    #avatar:active {
        transform: scale(0.975);
    }

    .small #avatar {
        width: 40px;
        height: 40px;
    }

    #avatar:hover {
        opacity: 0.8;
    }

    #name {
        margin: 0;
        font-size: 1rem;
        margin-left: 7px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-weight: 900;
        flex: 1;
        margin-bottom: 3px;
    }

    .small #name {
        font-size: 1.05rem;
    }

    #time {
        margin: 0;
        font-size: 0.9rem;
        margin-left: 5px;
        color: var(--text_gray);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .wrapper {
        flex: 1;
    }

    .post-info-container {
        display: flex;
        align-items: center;
    }

    #content {
        max-width: 525px;
        color: var(--text);
        margin: 0;
        font-size: 1rem;
        white-space: pre-wrap;
        overflow: hidden;
        text-align: start;
        border-radius: 5px;
        width: max-content;
        margin-left: 7px;
    }

    .small #content {
        max-width: 525px;
    }

    #attachment {
        max-height: 600px;
        border-radius: 20px;
        border: 1px solid var(--primary);
        cursor: pointer;
        margin-top: 10px;
        margin-left: 7px;
        max-width: 515px;
        transition: 150ms;
    }

    #attachment:active {
        opacity: 0.5;
    }

    .small #attachment {
        max-width: 515px;
        cursor: default;
    }

    .action-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: max-content;
        margin-top: 5px;
    }

    #likes {
        margin: 0;
        font-size: 1rem;
        text-align: center;
        margin-right: 30px;
        color: var(--text_gray);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: 250ms;
    }
</style>
