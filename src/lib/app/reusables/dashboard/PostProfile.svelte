<script lang="ts">
    import type { Post } from 'interfaces/all';
    import {
        DropdownTypes,
        currentDropdownId,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { mousePos } from 'stores/main';
    import {
        ModalTypes,
        targetImageModal,
        targetPostModal,
    } from 'stores/modals';
    import { onMount } from 'svelte';
    import { showDropdownMouse, showModal } from 'utilities/main';

    export let post: Post;
    let postContainer: HTMLDivElement;

    let postData = post.post;

    function showImage(): void {
        $targetImageModal = postData.attachment;

        showModal(ModalTypes.Image);
    }

    function showOptions(): void {
        $targetImageModal = postData.attachment;
        $targetPostModal = post;

        showDropdownMouse(DropdownTypes.Post, $mousePos);
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
    class={`post-container ${
        ($targetPostModal?.post == postData &&
            $dropdownVisible &&
            $currentDropdownId == DropdownTypes.Post) ||
        ($dropdownVisible && $currentDropdownId == DropdownTypes.Account)
            ? 'active'
            : ''
    }`}
    bind:this={postContainer}
    on:click={showImage}
    on:keydown={showImage}
    on:contextmenu={(e) => {
        showOptions();

        e.preventDefault();
    }}
>
    <div class="wrapper">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 48 48"
            fill="currentColor"
            stroke="currentColor"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
            /></svg
        >

        <h1>{postData.totalLikes}</h1>
    </div>
</div>

<style>
    .post-container {
        width: 250px;
        height: 250px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 3px;
        margin-left: 2px;
        margin-right: 2px;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        cursor: pointer;
        transition: 150ms filter, 150ms background;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        transition: 125ms;
        opacity: 0;
        backdrop-filter: brightness(50%);
    }

    .post-container:hover .wrapper {
        opacity: 1;
    }

    .active:hover .wrapper {
        opacity: 0;
    }

    .active {
        filter: brightness(50%);
    }

    svg {
        width: 32px;
        height: 32px;
        fill: white;
        stroke: white;
        margin-right: 5px;
    }

    h1 {
        font-size: 1.4rem;
        font-weight: 700;
        color: white;
        margin: 0;
        text-shadow: 0 0 5px black;
    }
</style>
