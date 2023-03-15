<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { dropdownVisible, type DropdownTypes } from 'stores/dropdowns';
    import { cachedAccountData, dataSaver } from 'stores/main';
    import {
        dismissDropdown,
        dismissModal,
        showDropdown,
    } from 'utilities/main';
    import { loadTargetProfile } from 'utilities/profile';

    export let profileData: FronvoAccount;
    export let dropdown: DropdownTypes = undefined;

    export let preDropdownCallback = () => {};

    function decideFollowOutput(followInfo: string[]): string {
        // Must either be our follower / ourselves / not private
        if (
            profileData.isFollower ||
            profileData.isSelf ||
            !profileData.isPrivate
        ) {
            return followInfo.length.toString();
        }

        return '?';
    }

    function callDropdown(): void {
        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            preDropdownCallback();
            showDropdown(dropdown);
        }
    }

    async function viewProfile(): Promise<void> {
        if ($dropdownVisible) {
            dismissDropdown();
            return;
        }

        await loadTargetProfile(profileData.profileId, $cachedAccountData);

        dismissModal();
    }
</script>

<div on:click={(dropdown && callDropdown) || viewProfile}>
    <img
        id="avatar"
        src={profileData.avatar && !$dataSaver
            ? profileData.avatar
            : '/svgs/profile/avatar.svg'}
        alt={`${profileData.username}'s avatar`}
        draggable={false}
    />

    <h1 id="username">
        {profileData?.username}
    </h1>

    <h1 id="profileId">@{profileData.profileId}</h1>

    <h1 id="following">
        <span>{decideFollowOutput(profileData.following)}</span> following
    </h1>
    <h1 id="followers">
        <span>{decideFollowOutput(profileData.followers)}</span> followers
    </h1>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: transparent;
        width: 175px;
        height: 250px;
        overflow: hidden;
        padding: 5px;
        transition: 150ms;
        cursor: pointer;
    }

    div:hover {
        background: var(--bg_color);
    }

    div h1 {
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    div h1 span {
        color: var(--profile_info_color);
    }

    div #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.7rem;
        color: var(--profile_info_color);
    }

    div #profileId {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.5rem;
    }

    div #following,
    div #followers {
        font-size: 1.5rem;
    }

    div #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 80px;
        height: 80px;
        border-radius: 10px;
    }

    @media screen and (max-width: 850px) {
        div {
            width: 300px;
            height: 65px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: start;
            padding: 0;
            margin: 0;
            cursor: default;
            margin-top: 5px;
            margin-bottom: 5px;
        }

        div:hover {
            background: transparent;
        }

        div #username {
            display: none;
        }

        div #profileId {
            font-size: 1.2rem;
        }

        div #following,
        div #followers {
            display: none;
        }

        div #avatar {
            width: 48px;
            height: 48px;
            margin-right: 5px;
        }
    }
</style>
