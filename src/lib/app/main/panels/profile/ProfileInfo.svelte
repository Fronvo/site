<script lang="ts">
    import { goto } from '$app/navigation';
    import CreatePost from '$lib/svgs/CreatePost.svelte';
    import DisableProfile from '$lib/svgs/DisableProfile.svelte';
    import EditProfile from '$lib/svgs/EditProfile.svelte';
    import Follow from '$lib/svgs/Follow.svelte';
    import Logout from '$lib/svgs/Logout.svelte';
    import { joinedCommunity, targetCommunityData } from 'stores/communities';
    import { followModalForFollowing, followModalInfo } from 'stores/main';
    import {
        ourProfileData,
        profileLoadingFinished,
        userCommunity,
        userData,
    } from 'stores/profile';
    import { fade } from 'svelte/transition';
    import { ModalTypes, PanelTypes } from 'types/main';
    import { showModal, switchPanel } from 'utilities/main';

    const isAccessible =
        $userData.isFollower || $userData.isSelf || !$userData.isPrivate;

    function showFollowInfo(followInfo: string[], forFollowing: boolean): void {
        if (!isAccessible) return;

        $followModalInfo = followInfo;
        $followModalForFollowing = forFollowing;

        showModal(ModalTypes.FollowInfo);
    }

    function formatFollowInfo(followInfo: number): string {
        // 100 -> 100
        // 1000 -> 1k
        // 1100 -> 1k
        // 1000000 -> 1m

        if (!isAccessible) return '?';

        if (followInfo / 1000000 >= 1) {
            return `${Math.floor(followInfo / 1000000)}m`;
        } else if (followInfo / 1000 >= 1) {
            return `${Math.floor(followInfo / 1000)}k`;
        } else {
            return `${followInfo}`;
        }
    }

    function visitCommunity(): void {
        switchPanel(PanelTypes.Communities);

        if (!$joinedCommunity) {
            $targetCommunityData = $userCommunity;

            setTimeout(() => {
                goto(`/community/${$userCommunity.communityId}`, {
                    replaceState: true,
                });
            }, 250);
        }
    }
</script>

{#if $profileLoadingFinished}
    <div class="info-container" in:fade={{ duration: 500 }}>
        <!-- Avatar, username -->

        <img
            id="avatar"
            src={$userData.avatar
                ? $userData.avatar
                : '/svgs/profile/default.svg'}
            alt={`${$userData.username}\'s avatar`}
            draggable={false}
        />

        <h1 id="username">
            {$userData.username}
        </h1>

        <h1 id="bio">
            {isAccessible ? $userData.bio : ''}
        </h1>

        {#if $userCommunity}
            <div class="community-container">
                <img
                    id="icon"
                    src={$userCommunity.icon
                        ? $userCommunity.icon
                        : '/svgs/profile/default.svg'}
                    alt={`${$userData.username}'s community`}
                    draggable={false}
                />
                <h1 id="community-name" on:click={visitCommunity}>
                    {$userCommunity.name}
                </h1>
            </div>
        {/if}

        <!-- Follow $userData -->
        <div class="follow-container">
            <h1 on:click={() => showFollowInfo($userData.following, true)}>
                <span>{formatFollowInfo($userData.following.length)}</span> following
            </h1>

            <h1 on:click={() => showFollowInfo($userData.followers, false)}>
                <span>{formatFollowInfo($userData.followers.length)}</span> followers
            </h1>
        </div>

        <div class="options-container">
            {#if $userData.isSelf}
                <EditProfile />
                <CreatePost />
                <Logout />
            {:else}
                <Follow />
            {/if}

            {#if !$userData.isSelf && $ourProfileData.isAdmin}
                <DisableProfile />
            {/if}
        </div>
    </div>
{/if}

<style>
    .info-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .info-container #avatar {
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

    .info-container #username {
        font-size: 3rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        color: var(--profile_info_color);
        text-align: center;
    }

    .info-container #bio {
        font-size: 1.7rem;
        margin: 0;
        margin-left: 10px;
        margin-right: 10px;
        color: var(--profile_info_color);
        text-align: center;
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
    }

    .community-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
    }

    .community-container #community-name {
        font-size: 2.1rem;
        color: var(--profile_info_color);
        cursor: pointer;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .community-container #icon {
        width: 42px;
        height: 42px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 5px;
    }

    .follow-container {
        display: flex;
        flex-wrap: nowrap;
        margin-top: 10px;
    }

    .follow-container h1 {
        cursor: pointer;
        font-size: 1.9rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .follow-container h1:first-child {
        margin-right: 20px;
    }

    .follow-container h1 span {
        color: var(--profile_info_color);
    }

    .options-container {
        margin-top: 10px;
    }

    @media screen and (max-width: 720px) {
        .info-container #avatar {
            width: 120px;
            height: 120px;
        }

        .info-container #username {
            font-size: 2.6rem;
        }

        .info-container #bio {
            font-size: 1.5rem;
        }

        .community-container #icon {
            width: 40px;
            height: 40px;
        }

        .community-container #community-name {
            font-size: 1.9rem;
        }

        .follow-container {
            margin-top: 5px;
        }

        .follow-container h1 {
            font-size: 1.6rem;
            cursor: default;
        }

        .follow-container h1:first-child {
            margin-right: 15px;
        }
    }

    @media screen and (max-width: 520px) {
        .info-container #avatar {
            width: 100px;
            height: 100px;
        }

        .info-container #username {
            font-size: 2.1rem;
        }

        .info-container #bio {
            font-size: 1.2rem;
        }

        .community-container {
            margin-top: 10px;
        }

        .community-container #icon {
            width: 32px;
            height: 32px;
        }

        .community-container #community-name {
            font-size: 1.7rem;
        }

        .follow-container h1 {
            font-size: 1.4rem;
        }

        .follow-container h1:first-child {
            margin-right: 10px;
        }
    }
</style>
