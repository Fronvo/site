<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import {
        ModalTypes,
        targetFriendModal,
        targetProfileModal,
    } from 'stores/modals';
    import { showDropdownMouse, showModal } from 'utilities/main';
    import { mousePos, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import {
        DropdownTypes,
        currentDropdownId,
        dropdownVisible,
    } from 'stores/dropdowns';

    export let profileData: FronvoAccount;

    let onlineP = false;

    let indicator: HTMLDivElement;

    function showProfileModal(): void {
        $targetProfileModal = profileData;

        showModal(ModalTypes.Profile);
    }

    function showOptions(): void {
        $targetFriendModal = profileData;

        showDropdownMouse(DropdownTypes.Friend, $mousePos);
    }

    function updateIndicator(): void {
        setTimeout(() => {
            if (!indicator) return;

            if (onlineP) {
                indicator.style.background = 'rgb(56, 212, 42)';
                indicator.style.border = '2px solid var(--primary)';
                indicator.style.visibility = 'visible';
            } else {
                indicator.style.visibility = 'hidden';
            }
        }, 0);
    }

    onMount(() => {
        onlineP = profileData.online;

        updateIndicator();

        socket.on('onlineStatusUpdated', ({ profileId, online }) => {
            if (profileId == profileData.profileId) {
                profileData.online = online;

                profileData = profileData;

                updateIndicator();
            }
        });

        socket.on('profileDataUpdated', ({ profileId, username, avatar }) => {
            if (profileId == profileData.profileId) {
                profileData.username = username;
                profileData.avatar = avatar;

                profileData = profileData;
            }
        });

        socket.on('profileStatusUpdated', ({ profileId, status }) => {
            if (profileId == profileData.profileId) {
                profileData.status = status;

                profileData = profileData;
            }
        });
    });
</script>

<div
    on:click={showProfileModal}
    on:keydown={showProfileModal}
    class={`friend-container ${!profileData.online ? 'offline' : ''} ${
        $targetFriendModal?.profileId == profileData.profileId &&
        $currentDropdownId == DropdownTypes.Friend &&
        $dropdownVisible
            ? 'active'
            : ''
    }`}
    on:contextmenu={(ev) => {
        showOptions();

        ev.preventDefault();
    }}
>
    <div class="badge-container">
        <img
            id="avatar"
            src={profileData.avatar
                ? `${profileData.avatar}/tr:w-72:h-72`
                : '/images/avatar.svg'}
            alt={`${profileData.username}'s avatar`}
            draggable={false}
        />

        <div bind:this={indicator} class="indicator" />
    </div>

    <div class="bottom-container">
        <h1 id="username">{profileData?.username}</h1>

        {#if profileData.status}
            <h1 id="status">{profileData?.status}</h1>
        {/if}
    </div>
</div>

<style>
    .friend-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        cursor: pointer;
        padding: 8px;
        overflow: hidden;
        width: 350px;
        height: 60px;
        border-bottom: 1px solid rgb(255, 255, 255, 0.05);
        pointer-events: all;
        transition: 125ms;
    }

    .badge-container {
        display: flex;
        align-items: center;
    }

    .friend-container:hover,
    .active {
        background: var(--primary);
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

    #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 36px;
        height: 36px;
        border-radius: 30px;
    }

    .offline #avatar {
        opacity: 0.75;
    }

    .indicator {
        width: 10px;
        height: 10px;
        border-radius: 30px;
        transform: translateX(-10px) translateY(14px);
        margin-right: 6px;
        margin-bottom: 2px;
    }

    #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.05rem;
        color: white;
        height: 23px;
        font-weight: 500;
    }

    .offline #username {
        opacity: 0.75;
    }

    #avatar {
        padding: 0;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    #status {
        font-size: 0.9rem;
        color: var(--gray);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-weight: 600;
        height: 20px;
    }

    .offline #status {
        display: none;
    }
</style>
