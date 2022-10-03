<script lang="ts">
    import { goto } from '$app/navigation';
    import Center from '$lib/app/Center.svelte';
    import Loading from '$lib/app/Loading.svelte';
    import type { FronvoAccount } from 'interfaces/app/main';
    import {
        followModalForFollowing,
        followModalInfo,
        modalAnimDuration,
    } from 'stores/app/main';
    import {
        profileLoadingFinished,
        targetProfile,
        userData,
        userPosts,
    } from 'stores/app/profile';
    import { dismissModal, fetchUser } from 'utilities/app/main';
    import { loadProfilePosts } from 'utilities/app/profile';

    let followInfo: FronvoAccount[] = [];

    // Cap at 20 max loaded
    const followInfoCopy = $followModalInfo.slice(0, 10);
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

        setTimeout(() => {
            goto(`/profile/${newProfile}`, {
                replaceState: true,
            });
        }, modalAnimDuration);

        // Reset everything for cool transitions
        $userData = undefined;
        $userPosts = undefined;
        $profileLoadingFinished = false;

        // Start loading the new profile
        const newProfile = followInfo[accountIndex].profileId;

        $targetProfile = newProfile;

        // Update profile panel
        $userData = await fetchUser(newProfile);

        const isAccessible =
            $userData.isFollower || $userData.isSelf || !$userData.isPrivate;

        if (isAccessible) {
            await loadProfilePosts(newProfile);
        } else {
            userPosts.set([]);
        }
    }

    $: loadFollowInfo();
</script>

<div class="following-container">
    <div class="header-container">
        <h1 id="header">
            <span>{$followModalInfo.length}</span>
            {$followModalForFollowing ? 'Following' : 'Followers'}
        </h1>
    </div>

    <hr />

    {#if loadingFinished}
        {#if followInfo.length == 0}
            <Center>
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

        <button
            id="close"
            on:click={() => {
                dismissModal();
            }}>Close</button
        >
    {:else}
        <Loading text="Loading..." />
    {/if}
</div>

<style>
    hr {
        width: 100px;
    }

    .following-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 20px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .header-container #header span {
        color: var(--profile_info_color);
    }

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

    #close {
        font-size: 2.2rem;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

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

        #close {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

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

        #close {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
