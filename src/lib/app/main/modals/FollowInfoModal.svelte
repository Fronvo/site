<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import Loading from '$lib/app/Loading.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { dataSaver } from 'stores/all';
    import { followModalForFollowing, followModalInfo } from 'stores/main';
    import { onMount } from 'svelte';
    import type { ModalData } from 'types/main';
    import { dismissModal, fetchUser } from 'utilities/main';
    import { loadProfilePanel } from 'utilities/profile';
    import ModalTemplate from '../ModalTemplate.svelte';

    let followInfo: FronvoAccount[] = [];

    // Cap at 20 max loaded
    const followInfoCopy = $dataSaver
        ? $followModalInfo.slice(0, 10)
        : $followModalInfo;
    let loadingFinished = false;

    async function loadFollowInfo() {
        // Fetch all followed users, notify UI once finished

        // Sanity check for new accounts, new UI will be displayed
        if (followInfoCopy.length == 0) {
            loadingFinished = true;
            return;
        }

        // Some followed users exist, fetch them
        for (const followIndex in followInfoCopy) {
            fetchUser(followInfoCopy[followIndex]).then((user) => {
                followInfo.push(user);

                // Finish loading
                if (followInfo.length == followInfoCopy.length) {
                    loadingFinished = true;
                }
            });
        }
    }

    async function viewProfile(accountIndex: number): Promise<void> {
        dismissModal();

        await loadProfilePanel(followInfo[accountIndex].profileId);
    }

    onMount(async () => {
        await loadFollowInfo();
    });

    const data: ModalData = {
        titlePreSpan: $followModalInfo.length,
        title: $followModalForFollowing ? 'Following' : 'Followers',

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if loadingFinished}
        {#if followInfo.length == 0}
            <Center absolute>
                <h1 id="no-follow">
                    No {$followModalForFollowing
                        ? 'followed users'
                        : 'followers'}
                </h1>
            </Center>
        {:else}
            <div class="following-items-container">
                {#each followInfo as { username, following, followers, avatar, isFollower, isPrivate, isSelf }, i}
                    <div on:click={() => viewProfile(i)}>
                        <img
                            id="avatar"
                            src={avatar ? avatar : '/svgs/profile/default.svg'}
                            alt={`${username}'s avatar`}
                            draggable={false}
                        />
                        <h1 id="username">{username}</h1>

                        <h1 id="following">
                            <span
                                >{isFollower || isSelf || !isPrivate
                                    ? following.length
                                    : '?'}</span
                            > following
                        </h1>
                        <h1 id="followers">
                            <span
                                >{isFollower || isSelf || !isPrivate
                                    ? followers.length
                                    : '?'}</span
                            > followers
                        </h1>
                    </div>
                {/each}
            </div>
        {/if}
    {:else}
        <Loading text="Loading..." />
    {/if}
</ModalTemplate>

<style>
    .following-items-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto;
        flex: 1;
    }

    .following-items-container div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--nav_bg_color);
        box-shadow: 0 0 10px var(--nav_shadow_color);
        width: 350px;
        height: min-content;
        border-radius: 10px;
        padding: 10px;
        margin-right: 25px;
        margin-bottom: 20px;
        transition: 400ms background;
        cursor: pointer;
        background-size: 200% auto;
        background-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 1%) 0%,
            rgba(146, 73, 255, 20%) 51%,
            rgba(0, 0, 0, 1%) 100%
        );
    }

    .following-items-container div:hover {
        background-position: right center;
    }

    .following-items-container div h1 {
        margin: 0;
    }

    .following-items-container div h1 span {
        color: var(--profile_info_color);
    }

    .following-items-container div #username {
        font-size: 2.5rem;
        color: var(--profile_info_color);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .following-items-container div #following,
    .following-items-container div #followers {
        font-size: 2.1rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .following-items-container div #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 128px;
        height: 128px;
        border-radius: 10px;
    }

    #no-follow {
        font-size: 2.3rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 720px) {
        .following-items-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }

        .following-items-container div {
            width: 300px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: default;
        }

        .following-items-container div:first-child {
            padding-top: 0;
        }

        .following-items-container div #username {
            font-size: 1.7rem;
            cursor: default;
        }

        .following-items-container div #following,
        .following-items-container div #followers {
            display: none;
        }

        .following-items-container div #avatar {
            width: 64px;
            height: 64px;
            margin-right: 5px;
        }

        #no-follow {
            font-size: 2rem;
        }
    }

    @media screen and (max-width: 520px) {
        .following-items-container div {
            width: 280px;
            margin-right: 0;
            margin-bottom: 10px;
            padding: 5px;
        }

        .following-items-container div #username {
            font-size: 1.7rem;
        }

        .following-items-container div #following,
        .following-items-container div #followers {
            font-size: 1.7rem;
        }

        #no-follow {
            font-size: 1.7rem;
        }
    }
</style>
