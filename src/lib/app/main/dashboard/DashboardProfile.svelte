<script lang="ts">
    import PostProfile from '$lib/app/reusables/dashboard/PostProfile.svelte';
    import PropPost from '$lib/app/reusables/dashboard/PropPost.svelte';
    import { ourPosts } from 'stores/dashboard';
    import { DropdownTypes } from 'stores/dropdowns';
    import { mousePos, socket } from 'stores/main';
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { onMount } from 'svelte';
    import InfiniteLoading from 'svelte-infinite-loading';
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { setTitle, showDropdownMouse, showModal } from 'utilities/main';

    async function loadMore({ detail: { loaded, complete } }): Promise<void> {
        if ($ourData.totalPosts == $ourPosts.length) {
            complete();
            return;
        }

        socket.emit(
            'fetchProfilePosts',
            {
                profileId: $ourData.profileId,
                from: $ourPosts.length.toString(),
                to: ($ourPosts.length + 15).toString(),
            },
            ({ profilePosts }) => {
                if (profilePosts.length == 0) {
                    complete();
                } else {
                    const tempPosts = $ourPosts;
                    tempPosts.push(...profilePosts);

                    $ourPosts = tempPosts;

                    loaded();
                }
            }
        );
    }

    function editProfile(): void {
        showModal(ModalTypes.EditProfile);
    }

    function showOptions(): void {
        showDropdownMouse(DropdownTypes.Account, $mousePos);
    }

    onMount(() => {
        setTitle($ourData.username);
    });
</script>

<div class={`profile-container`} in:fade={{ duration: 200, easing: sineInOut }}>
    <img
        id="avatar"
        src={$ourData.avatar
            ? `${$ourData.avatar}/tr:w-512:h-512`
            : '/images/avatar.png'}
        draggable={false}
        alt={`${$ourData.profileId}\'s avatar'`}
    />

    <h1 id="username">{$ourData.username}</h1>

    <div class="options">
        <button on:click={editProfile}>Edit profile</button>

        <svg
            on:click={showOptions}
            on:keydown={showOptions}
            id="menu"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 20 20"
            fill="currentColor"
            ><path
                d="M10 12a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0-6a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 12a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
            /></svg
        >
    </div>

    {#if $ourPosts}
        <div class="posts-container">
            {#each $ourPosts as post}
                <PostProfile {post} />
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
        </div>
    {:else}
        <div class="empty">
            <div class="props">
                {#each { length: 9 } as _, i}
                    <PropPost opacity={1 - 0.95 + (1 - (i + 2.5) / 12.5)} />
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        height: 100%;
        user-select: none;
        margin-top: 5px;
        padding-top: 10px;
    }

    #avatar {
        min-width: 128px;
        min-height: 128px;
        width: 128px;
        height: 128px;
        border-radius: 100px;
        box-shadow: 0 0 5px black;
    }

    h1 {
        margin: 0;
    }

    #username {
        font-size: 2rem;
        font-weight: 600;
        color: var(--text);
    }

    .options {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        margin-left: 30px;
    }

    button {
        width: 200px;
        font-size: 1.2rem;
        font-weight: 500;
        background: rgb(125, 125, 125, 0.1);
        color: var(--text);
    }

    button:hover {
        background: rgb(125, 125, 125, 0.2);
    }

    .options svg {
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        margin-left: 5px;
        fill: var(--gray);
        border-radius: 30px;
        padding: 4px;
    }

    .options svg:hover {
        background: var(--primary);
    }

    .posts-container {
        width: 100%;
        max-width: 770px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 25px;
        margin-left: 10px;
        padding-bottom: 100px;
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
    }

    .props {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 1050px) {
        .posts-container {
            width: 100%;
            justify-content: center;
            margin-left: 0;
        }
    }
</style>
