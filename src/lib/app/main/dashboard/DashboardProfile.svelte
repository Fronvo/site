<script lang="ts">
    import PostProfile from '$lib/app/reusables/dashboard/PostProfile.svelte';
    import Post from '$lib/app/reusables/dashboard/PostProfile.svelte';
    import PropPost from '$lib/app/reusables/dashboard/PropPost.svelte';
    import { ourPosts, totalOurPosts } from 'stores/dashboard';
    import { socket } from 'stores/main';
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import InfiniteLoading from 'svelte-infinite-loading';
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { loadOurPosts } from 'utilities/dashboard';
    import { isAcceptedImage, showModal } from 'utilities/main';
    import { uploadImage } from 'utilities/rooms';

    let attachmentBase64: string | ArrayBuffer;

    async function loadMore({ detail: { loaded, complete } }): Promise<void> {
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

    function addImage(): void {
        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = async (_) => {
            let file = Array.from(input.files)[0];

            if (file.size > ($ourData.isPRO ? 3000000 : 1000000)) {
                return;
            }

            if (isAcceptedImage(file.type)) {
                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    attachmentBase64 = reader.result;

                    socket.emit('canPost', async ({ canPost }) => {
                        if (!canPost) {
                            showModal(ModalTypes.GoPRO);
                        } else {
                            socket.emit(
                                'sharePost',
                                {
                                    attachment: await uploadImage(
                                        attachmentBase64,
                                        $ourData.isPRO
                                    ),
                                },
                                () => {
                                    input.value = '';
                                    input.disabled = false;

                                    attachmentBase64 = '';

                                    loadOurPosts($ourData.profileId);
                                }
                            );
                        }
                    });
                });

                reader.readAsDataURL(file);
            }
        };

        input.click();
    }
</script>

<div class="profile-container" in:fade={{ duration: 200, easing: sineInOut }}>
    <img
        id="avatar"
        src={$ourData.avatar ? $ourData.avatar : '/images/avatar.svg'}
        draggable={false}
        alt={`${$ourData.profileId}\'s avatar'`}
    />

    <h1 id="username">{$ourData.profileId}</h1>

    <button id="share" on:click={addImage}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                fill-rule="evenodd"
                d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Zm10 5.75a.75.75 0 0 0 .75-.75v-5.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V17c0 .414.336.75.75.75Zm-4-10a.75.75 0 0 1 0-1.5h8a.75.75 0 0 1 0 1.5H8Z"
                clip-rule="evenodd"
            /></svg
        >Share post</button
    >

    {#if $totalOurPosts > 0}
        <h1 id="total">
            {$totalOurPosts} post{$totalOurPosts != 1 ? 's' : ''}
        </h1>
    {/if}

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
        width: 100px;
        height: 100px;
        border-radius: 100px;
    }

    h1 {
        margin: 0;
    }

    #username {
        font-size: 1.7rem;
        font-weight: 600;
    }

    #share {
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: none;
        background: transparent;
        border: 2px solid var(--branding);
        border-radius: 10px;
        font-size: 1.2rem;
        transition: 150ms;
        height: 50px;
        font-weight: 600;
        margin-top: 15px;
    }

    #share svg {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        fill: var(--branding);
        transition: 150ms;
    }

    #share:hover {
        background: var(--branding);
        box-shadow: 0 0 10px var(--branding);
    }

    #share:hover svg {
        fill: white;
    }

    #total {
        font-size: 1.4rem;
        margin-top: 20px;
    }

    .posts-container {
        width: 60%;
        min-width: 600px;
        display: flex;
        align-items: start;
        flex-direction: row;
        overflow-y: auto;
        flex-wrap: wrap;
        padding-top: 10px;
        transform: translateX(45px);
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
            width: 90%;
        }
    }
</style>
