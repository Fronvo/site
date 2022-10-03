<script lang="ts">
    import { goto } from '$app/navigation';
    import Loading from '$lib/app/Loading.svelte';
    import type { FronvoAccount } from 'interfaces/app/main';
    import { joinedCommunity, ourProfileData } from 'stores/app/communities';
    import { ModalTypes } from 'types/app/main';
    import { targetCommunityMember } from 'stores/app/main';
    import {
        profileLoadingFinished,
        targetProfile,
        userData,
        userPosts,
    } from 'stores/app/profile';
    import { dismissModal, fetchUser, showModal } from 'utilities/app/main';
    import { loadProfilePosts } from 'utilities/app/profile';

    let memberInfo: FronvoAccount[] = [];

    // Cap at 20 max loaded
    const memberInfoCopy = $joinedCommunity.members.slice(0, 5);
    let loadingFinished = false;

    function isOwner(profileId?: string): boolean {
        return (
            $joinedCommunity.ownerId ==
            (profileId ? profileId : $ourProfileData.profileId)
        );
    }

    async function loadFollowInfo() {
        // Fetch all community members, notify UI once finished

        for (const memberIndex in memberInfoCopy) {
            fetchUser(memberInfoCopy[memberIndex]).then((user) => {
                memberInfo.push(user);

                // Finish loading
                if (memberInfo.length == memberInfoCopy.length) {
                    loadingFinished = true;
                }
            });
        }
    }

    async function viewProfile(accountIndex: number): Promise<void> {
        dismissModal(() => {
            goto(`/profile/${newProfile}`, {
                replaceState: true,
            });
        });

        // Reset everything for cool transitions
        $userData = undefined;
        $userPosts = undefined;
        $profileLoadingFinished = false;

        // Start loading the new profile
        const newProfile = memberInfo[accountIndex].profileId;

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

    function editProfile(accountIndex: number): void {
        dismissModal(() => {
            $targetCommunityMember = memberInfo[accountIndex];

            showModal(ModalTypes.EditCommunityMember);
        });
    }

    $: loadFollowInfo();
</script>

<div class="members-container">
    <div class="header-container">
        <h1 id="header">
            <span>{$joinedCommunity.members.length}</span>
            Members
        </h1>
    </div>

    <hr />

    {#if loadingFinished}
        <div class="members-items-container">
            {#each memberInfo as { profileId, username, following, followers, avatar, isFollower, isPrivate, isSelf }, i}
                <div
                    class={isOwner(profileId) ? 'owner-div' : ''}
                    on:click={() =>
                        isOwner() && !($ourProfileData.profileId == profileId)
                            ? editProfile(i)
                            : viewProfile(i)}
                >
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

    .members-container {
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

    .members-items-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto;
        flex: 1;
    }

    .members-items-container div {
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

    .members-items-container .owner-div #username {
        color: gold;
    }

    .members-items-container div:hover {
        background-position: right center;
    }

    .members-items-container div h1 {
        margin: 0;
    }

    .members-items-container div h1 span {
        color: var(--profile_info_color);
    }

    .members-items-container div #username {
        font-size: 2.5rem;
        color: var(--profile_info_color);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .members-items-container div #following,
    .members-items-container div #followers {
        font-size: 2.1rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .members-items-container div #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-members: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 128px;
        height: 128px;
        border-radius: 10px;
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

        .members-items-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }

        .members-items-container div {
            width: 300px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: default;
        }

        .members-items-container div:first-child {
            padding-top: 0;
        }

        .members-items-container div #username {
            font-size: 1.7rem;
            cursor: default;
        }

        .members-items-container div #following,
        .members-items-container div #followers {
            display: none;
        }

        .members-items-container div #avatar {
            width: 64px;
            height: 64px;
            margin-right: 5px;
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

        .members-items-container div {
            width: 280px;
            margin-right: 0;
            margin-bottom: 10px;
            padding: 5px;
        }

        .members-items-container div #username {
            font-size: 1.7rem;
        }

        .members-items-container div #following,
        .members-items-container div #followers {
            font-size: 1.7rem;
        }

        #close {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
