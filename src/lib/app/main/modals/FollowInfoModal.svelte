<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { dataSaver } from 'stores/all';
    import {
        cachedAccountData,
        followModalForFollowing,
        followModalInfo,
    } from 'stores/main';
    import { targetProfile } from 'stores/profile';
    import { onMount } from 'svelte';
    import type { ModalData } from 'types/main';
    import {
        dismissModal,
        fetchUser,
        findCachedAccount,
        setProgressBar,
    } from 'utilities/main';
    import { loadProfilePanel } from 'utilities/profile';
    import ModalTemplate from '../ModalTemplate.svelte';

    let followInfo: FronvoAccount[] = [];

    // Cap at 20 max loaded
    const followInfoCopy = $dataSaver
        ? $followModalInfo.slice(0, 10)
        : $followModalInfo;
    let loadingFinished = false;

    async function loadFollowInfo() {
        setProgressBar(true);

        // Fetch all followed users, notify UI once finished

        // Sanity check for new accounts, new UI will be displayed
        if (followInfoCopy.length == 0) {
            loadingFinished = true;
            setProgressBar(false);
            return;
        }

        // Some followed users exist, fetch them
        for (const followIndex in followInfoCopy) {
            const targetUser = findCachedAccount(
                followInfoCopy[followIndex],
                $cachedAccountData
            );

            if (targetUser) {
                followInfo.push(targetUser);

                checkLoadingDone();
            } else {
                // Not cached, fetch
                fetchUser(followInfoCopy[followIndex]).then((user) => {
                    followInfo.push(user);

                    // Update cache
                    $cachedAccountData.push(user);

                    checkLoadingDone();
                });
            }
        }

        function checkLoadingDone(): void {
            // Finish loading
            if (followInfo.length == followInfoCopy.length) {
                setProgressBar(false);
                loadingFinished = true;
            }
        }
    }

    async function viewProfile(accountIndex: number): Promise<void> {
        dismissModal();

        $targetProfile = followInfo[accountIndex].profileId;

        await loadProfilePanel(
            $cachedAccountData,
            followInfo[accountIndex].profileId
        );
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
                <h1 class="modal-header">
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
                            src={avatar && !$dataSaver
                                ? avatar
                                : '/svgs/profile/avatar.svg'}
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
        background: transparent;
        box-shadow: 0 0 10px var(--accent_shadow_color);
        width: 200px;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-right: 10px;
        margin-left: 10px;
        height: 235px;
        overflow: hidden;
        border-radius: 5px;
        padding: 10px;
        transition: 200ms;
        cursor: pointer;
    }

    .following-items-container div:hover {
        opacity: 0.8;
    }

    .following-items-container div h1 {
        margin: 0;
    }

    .following-items-container div h1 span {
        color: var(--profile_info_color);
    }

    .following-items-container div #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.9rem;
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
        font-size: 1.7rem;
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
        width: 100px;
        height: 100px;
        border-radius: 10px;
    }

    @media screen and (max-width: 1100px) {
        .following-items-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }

        .following-items-container div {
            width: 300px;
            height: 75px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            margin: 10px;
            margin-bottom: 5px;
            cursor: default;
        }

        .following-items-container div:hover {
            opacity: 1;
        }

        .following-items-container div:nth-child(1) {
            margin-left: 10px;
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
    }

    @media screen and (max-width: 520px) {
        .following-items-container div {
            height: 65px;
        }

        .following-items-container div #username {
            font-size: 1.5rem;
        }

        .following-items-container div #avatar {
            width: 58px;
            height: 58px;
        }
    }
</style>
