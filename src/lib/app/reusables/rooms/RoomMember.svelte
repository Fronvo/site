<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { ModalTypes, targetProfileModal } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { onDestroy } from 'svelte';
    import { showModal } from 'utilities/main';
    import { dropdownVisible } from 'stores/dropdowns';
    import { socket } from 'stores/main';
    import { currentServer } from 'stores/rooms';

    export let profileData: FronvoAccount;

    let unsubscribe: Unsubscriber;

    function showProfileModal(): void {
        if (profileData.profileId == $ourData.profileId) {
            $targetProfileModal = $ourData;
        } else {
            $targetProfileModal = profileData;
        }

        showModal(ModalTypes.Profile);
    }

    onMount(() => {
        if (profileData.profileId == $ourData.profileId) {
            unsubscribe = ourData.subscribe((data) => {
                if (!data) return;

                profileData = data;
            });
        }

        socket.on('onlineStatusUpdated', ({ profileId, online }) => {
            if (profileId == profileData.profileId) {
                profileData.online = online;
            }
        });

        socket.on('profileDataUpdated', ({ profileId, username, avatar }) => {
            if (profileId == profileData.profileId) {
                profileData.username = username;
                profileData.avatar = avatar;

                // Live sync
                profileData = profileData;
            }
        });

        socket.on('profileStatusUpdated', ({ profileId, status }) => {
            if (profileId == profileData.profileId) {
                profileData.status = status;

                // Live sync
                profileData = profileData;
            }
        });
    });

    onDestroy(() => {
        if (profileData.profileId == $ourData.profileId) {
            unsubscribe();
        }
    });
</script>

<div
    on:click={showProfileModal}
    on:keydown={showProfileModal}
    class={`member-container ${!profileData.online ? 'offline' : ''}`}
>
    <div class="badge-container">
        <img
            id="avatar"
            src={profileData.avatar
                ? `${profileData.avatar}/tr:w-64:h-64`
                : '/images/avatar.png'}
            alt={`${profileData.username}'s avatar`}
            draggable={false}
        />
    </div>

    <div class="bottom-container">
        <div class="top-container">
            <h1 id="username">{profileData?.username}</h1>

            {#if profileData.profileId == $currentServer.ownerId}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><path
                        fill="gold"
                        d="m19.687 14.093l.184-1.705c.097-.91.162-1.51.111-1.888H20a1.5 1.5 0 1 0-1.136-.52c-.326.201-.752.626-1.393 1.265c-.495.493-.742.739-1.018.777a.833.833 0 0 1-.45-.063c-.254-.112-.424-.416-.763-1.025l-1.79-3.209c-.209-.375-.384-.69-.542-.942a2 2 0 1 0-1.816 0c-.158.253-.333.567-.543.942L8.76 10.934c-.34.609-.51.913-.764 1.025a.833.833 0 0 1-.45.063c-.275-.038-.522-.284-1.017-.777c-.641-.639-1.067-1.064-1.393-1.265A1.5 1.5 0 1 0 4 10.5h.018c-.051.378.014.979.111 1.888l.184 1.705c.102.946.186 1.847.29 2.657h14.794c.104-.81.188-1.71.29-2.657ZM10.912 21h2.176c2.836 0 4.254 0 5.2-.847c.413-.37.674-1.036.863-1.903H4.849c.189.867.45 1.534.863 1.903c.946.847 2.364.847 5.2.847Z"
                    /></svg
                >
            {/if}
        </div>

        {#if profileData.status}
            <h1 id="status">{profileData?.status}</h1>
        {/if}
    </div>
</div>

<style>
    .member-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        cursor: pointer;
        width: 100%;
        height: 48px;
        padding: 4px;
        border-radius: 5px;
        margin-bottom: 2px;
        transition: 125ms;
    }

    .badge-container {
        display: flex;
        align-items: center;
    }

    .member-container:hover {
        background: var(--secondary);
    }

    .member-container:hover #avatar {
        opacity: 1;
    }

    .member-container:hover #username {
        opacity: 1;
        color: white;
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
        width: 32px;
        height: 32px;
        border-radius: 30px;
        margin-right: 20px;
        transition: 125ms;
    }

    .offline #avatar {
        opacity: 0.5;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
        transform: translateX(-10px);
    }

    .top-container {
        display: flex;
        align-items: center;
    }

    #username {
        font-size: 1rem;
        height: 23px;
        color: var(--gray);
        white-space: nowrap;
        max-width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: 125ms;
    }

    .offline #username {
        opacity: 0.5;
    }

    .top-container svg {
        width: 18px;
        height: 18px;
        margin-left: 5px;
    }

    #status {
        height: 17px;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--gray);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .offline #status {
        display: none;
    }
</style>
