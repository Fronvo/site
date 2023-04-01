<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { onlineMembers } from 'stores/community';
    import { dropdownVisible, type DropdownTypes } from 'stores/dropdowns';
    import { dataSaver } from 'stores/main';
    import { fade } from 'svelte/transition';
    import { dismissDropdown, showDropdown } from 'utilities/main';
    import { ourData } from 'stores/profile';

    export let profileData: FronvoAccount;
    export let dropdown: DropdownTypes = undefined;

    export let preDropdownCallback = () => {};

    function callDropdown(): void {
        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            preDropdownCallback();
            showDropdown(dropdown);
        }
    }
</script>

<div
    class="preview-container"
    in:fade={{ duration: 150 }}
    on:contextmenu={dropdown && callDropdown}
>
    <img
        id="avatar"
        src={profileData.avatar && !$dataSaver
            ? profileData.avatar
            : '/svgs/profile/avatar.svg'}
        alt={`${profileData.username}'s avatar`}
        draggable={false}
    />

    <div class="bottom-container">
        <h1 id="username">
            {profileData?.username}
        </h1>

        <h1
            class={`${
                !$onlineMembers.includes(profileData.profileId)
                    ? 'offline'
                    : 'online'
            }`}
            id="status"
        >
            {$onlineMembers.includes(profileData.profileId) ||
            profileData.profileId == $ourData?.profileId
                ? 'Online now'
                : 'Offline'}
        </h1>
    </div>
</div>

<style>
    .preview-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        overflow: hidden;
        padding: 12px;
        padding-left: 20px;
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

    div #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 48px;
        border-radius: 10px;
        margin-right: 10px;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .bottom-container #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.5rem;
        color: var(--profile_info_color);
        width: 100%;
    }

    .bottom-container #status {
        font-size: 1.2rem;
        width: 100%;
    }

    .bottom-container .online {
        color: green;
    }

    .bottom-container .offline {
        color: red;
    }
</style>
