<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { ModalTypes, targetProfileModal } from 'stores/modals';
    import { showModal } from 'utilities/main';
    import { socket } from 'stores/main';
    import { onMount } from 'svelte';

    export let profileData: FronvoAccount;

    function showProfileModal(): void {
        $targetProfileModal = profileData;

        showModal(ModalTypes.Profile);
    }

    onMount(() => {
        socket.on('onlineStatusUpdated', ({ profileId, online }) => {
            if (profileId == profileData.profileId) {
                profileData.online = online;

                profileData = profileData;
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
    class={`friend-container`}
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

        {#if profileData.online}
            <div class="indicator" />
        {/if}
    </div>

    <div class="bottom-container">
        <h1 id="username">{profileData?.username}</h1>

        <h1 id="status">{profileData?.status}</h1>
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
        width: 100%;
        border-bottom: 1px solid var(--primary);
    }

    .badge-container {
        display: flex;
        align-items: center;
    }

    .indicator {
        position: fixed;
        background: rgb(56, 212, 42);
        width: 16px;
        height: 16px;
        border-radius: 30px;
        transform: translateX(22px) translateY(12px);
        border: 3px solid var(--bg);
    }

    .pending {
        cursor: default;
    }

    .pending:hover {
        background: transparent;
    }

    .pending div:hover {
        background: transparent;
    }

    div:hover {
        background: var(--primary);
    }

    .indicator:hover {
        background: rgb(56, 212, 42);
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
        margin-right: 8px;
    }

    .pending #avatar {
        margin: 0;
        border-radius: 30px;
        cursor: pointer;
        pointer-events: all;
        transition: 150ms;
        width: 34px;
        height: 34px;
        border: 2px solid var(--bg);
    }

    .pending #avatar:hover {
        border: 2px solid var(--branding);
    }

    .pending #username {
        margin-left: 8px;
        width: 130px;
    }

    #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.05rem;
        color: var(--text);
    }

    #avatar {
        padding: 0;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
    }

    #status {
        font-size: 0.9rem;
        color: var(--branding);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-weight: 600;
    }
</style>
