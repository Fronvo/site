<script lang="ts">
    import {
        differenceInDays,
        differenceInHours,
        differenceInMinutes,
        differenceInMonths,
        differenceInYears,
    } from 'date-fns';
    import type { Post } from 'interfaces/all';
    import {
        ModalTypes,
        targetImageModal,
        targetProfileModal,
    } from 'stores/modals';
    import { onMount } from 'svelte';
    import { showModal } from 'utilities/main';

    export let post: Post;
    let postContainer: HTMLDivElement;

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

    onMount(() => {
        setTimeout(() => {
            if (postContainer) {
                postContainer.style.backgroundImage = `url(${post.post.attachment})`;
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
            src={profileData.avatar}
            draggable={false}
            alt={`${postData.author}\'s avatar'`}
        />
        <h1 id="name">{postData.author}</h1>

        <h1 id="time">• {dateSuffix}</h1>
    </div>

    <div
        class="attachment"
        bind:this={postContainer}
        on:click={showImage}
        on:keydown={showImage}
    >
        <div class="wrapper">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137Z"
                /></svg
            >

            <h1>{postData.totalLikes}</h1>
        </div>
    </div>
</div>

<style>
    .post-container {
        width: 250px;
        height: 250px;
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
        font-size: 1rem;
        color: var(--gray);
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        transition: 200ms;
        z-index: 1;
        opacity: 0;
        backdrop-filter: blur(15px) brightness(60%);
        border-radius: 10px;
    }

    .attachment:hover .wrapper {
        opacity: 1;
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
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0 0 4px black;
        transition: 100ms filter, 100ms background;
    }

    svg {
        width: 36px;
        height: 36px;
        fill: red;
        margin-right: 10px;
    }

    h1 {
        font-size: 1.5rem;
        color: white;
        margin: 0;
        transform: translateY(-2px);
        text-shadow: 0 0 10px black;
    }
</style>
