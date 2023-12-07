<script lang="ts">
    import type { Post } from 'interfaces/all';
    import { ModalTypes, targetImageModal } from 'stores/modals';
    import { onMount } from 'svelte';
    import { showModal } from 'utilities/main';

    export let post: Post;
    let postContainer: HTMLDivElement;

    let postData = post.post;

    function showImage(): void {
        $targetImageModal = postData.attachment;

        showModal(ModalTypes.Image);
    }

    onMount(() => {
        setTimeout(() => {
            if (postContainer) {
                postContainer.style.backgroundImage = `url(${post.post.attachment}/tr:w-600:h-600:pr-true)`;
            }
        }, 0);
    });

    $: postData = post.post;
</script>

<div
    class="post-container"
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

<style>
    .post-container {
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        margin-right: 20px;
        margin-left: 20px;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 10px;
        cursor: pointer;
        transition: 150ms filter, 150ms background;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        transition: 150ms;
        z-index: 1;
        opacity: 0;
        backdrop-filter: blur(15px) brightness(60%);
    }

    .post-container:hover .wrapper {
        opacity: 1;
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
