<script lang="ts">
    import type { Post } from 'interfaces/all';
    import { ourData } from 'stores/profile';
    import { showDropdown, showModal } from 'utilities/main';
    import {
        ModalTypes,
        targetImageModal,
        targetPostModal,
        targetProfileModal,
    } from 'stores/modals';
    import {
        differenceInDays,
        differenceInHours,
        differenceInMinutes,
        differenceInMonths,
        differenceInYears,
    } from 'date-fns';
    import Like from '$lib/svgs/Like.svelte';
    import { onMount } from 'svelte';
    import { socket } from 'stores/main';
    import { DropdownTypes } from 'stores/dropdowns';
    import linkifyHtml from 'linkify-html';
    import Comment from '$lib/svgs/Comment.svelte';
    import Share from '$lib/svgs/Share.svelte';

    export let post: Post;
    export let small = false;
    export let preview = false;

    let profileData = post.profileData;
    let postData = post.post;

    let dateSuffix: string;
    let showLinks = false;

    let settings: SVGSVGElement;

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

    function showPostSettings(): void {
        $targetPostModal = post;

        showDropdown(DropdownTypes.PostSettings, settings, 'bottom', -30);
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

    function showGif(): void {
        if (small) return;

        $targetImageModal = postData.gif;

        showModal(ModalTypes.Image);
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

    $: {
        updateSuffix(postData.creationDate);

        if (postData.content) {
            // Sanitise first
            showLinks =
                postData.content.includes('https') &&
                !postData.content.includes('<img') &&
                !postData.content.includes('<svg');
        }
    }
</script>

<div
    class={`post-container ${small ? 'small' : ''} ${preview ? 'preview' : ''}`}
>
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
        <img
            src="/images/avatar.svg"
            draggable={false}
            alt="Avatar"
            id="avatar"
            on:click={showProfileModal}
            on:keydown={showProfileModal}
        />{/if}

    <div class="wrapper">
        <div class="post-info-container">
            <h1 id="name">{profileData.profileId}</h1>

            <h1 id="time">{dateSuffix}</h1>

            {#if postData.author == $ourData.profileId && !preview}
                <svg
                    class="action"
                    bind:this={settings}
                    on:click={showPostSettings}
                    on:keydown={showPostSettings}
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><path
                        fill="var(--text)"
                        d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z"
                    /></svg
                >
            {/if}
        </div>

        <div class="post-wrapper">
            {#if postData.content}
                <h1 id="content">
                    {#if showLinks}
                        {@html linkifyHtml(postData.content, {
                            attributes: {
                                class: 'link',
                                target: '_blank',
                            },
                        })}
                    {:else}
                        {postData.content}
                    {/if}
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
            {:else if postData.gif}
                <img
                    id="attachment"
                    src={postData.gif}
                    draggable={false}
                    alt={'Post GIF'}
                    on:click={showGif}
                    on:keydown={showGif}
                />
            {/if}
        </div>

        <div class="action-container">
            <Like callback={likePost} liked={postData.isLiked} />

            <h1>{postData.totalLikes}</h1>

            <!-- <Comment />

            <h1>0</h1>

            <Share /> -->
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
        border: none;
        border-bottom: 1px solid var(--primary);
    }

    .small:hover {
        background: transparent;
        cursor: default;
    }

    .preview {
        border: none;
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
        color: var(--text_gray_secondary);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .action {
        width: 30px;
        height: 30px;
        padding: 5px;
        border-radius: 15px;
        margin-left: 10px;
        z-index: 1;
        transition: 75ms;
    }

    .action:hover {
        background: var(--primary);
    }

    .action:active {
        transform: scale(0.975);
        opacity: 0.75;
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

    .action-container h1 {
        margin: 0;
        font-size: 0.95rem;
        text-align: center;
        margin-right: 35px;
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
