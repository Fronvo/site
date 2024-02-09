<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { ModalTypes, targetProfileModal } from 'stores/modals';
    import { showDropdownMouse, showModal } from 'utilities/main';
    import { mousePos, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import { DropdownTypes } from 'stores/dropdowns';

    export let profileData: FronvoAccount;

    function showProfileModal(): void {
        $targetProfileModal = profileData;

        showModal(ModalTypes.Profile);
    }

    function showOptions(): void {
        $targetProfileModal = profileData;

        showDropdownMouse(DropdownTypes.Pending, $mousePos);
    }

    onMount(() => {
        socket.on('profileDataUpdated', ({ profileId, username, avatar }) => {
            if (profileId == profileData.profileId) {
                profileData.username = username;
                profileData.avatar = avatar;

                profileData = profileData;
            }
        });
    });
</script>

<div
    on:click={showProfileModal}
    on:keydown={showProfileModal}
    class="pending-container"
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
                : '/images/avatar.png'}
            alt={`${profileData.username}'s avatar`}
            draggable={false}
        />
    </div>

    <div class="bottom-container">
        <h1 id="username">{profileData?.username}</h1>
    </div>
</div>

<style>
    .pending-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        cursor: pointer;
        padding: 8px;
        width: 340px;
        height: 60px;
        pointer-events: all;
        border-radius: 10px;
        transition: 125ms;
        margin-bottom: 2px;
    }

    .badge-container {
        display: flex;
        align-items: center;
    }

    .pending-container:hover {
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
        margin-right: 12px;
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
        flex: 1;
    }

    #avatar {
        padding: 0;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
</style>
