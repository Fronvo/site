<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { targetProfileModal } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { onDestroy } from 'svelte';
    import { showDropdown } from 'utilities/main';
    import { DropdownTypes } from 'stores/dropdowns';
    import { socket } from 'stores/main';
    import { currentRoomData } from 'stores/rooms';

    export let profileData: FronvoAccount;

    let container: HTMLDivElement;
    let unsubscribe: Unsubscriber;

    function showProfileModal(): void {
        if (profileData.profileId == $ourData.profileId) {
            $targetProfileModal = $ourData;
        } else {
            $targetProfileModal = profileData;
        }

        showDropdown(DropdownTypes.Profile, container, 'left', -30, 10);
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
    class="member-container"
    bind:this={container}
>
    <div class="badge-container">
        {#if profileData.avatar}
            <img
                id="avatar"
                src={profileData.avatar}
                alt={`${profileData.username}'s avatar`}
                draggable={false}
            />
        {:else}
            <svg
                id="avatar"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 256 256"
                ><path
                    fill="var(--text)"
                    d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z"
                /></svg
            >
        {/if}

        {#if profileData.online}
            <div class="indicator" />
        {/if}
    </div>

    <div class="bottom-container">
        <div class="top-container">
            <h1 id="username">{profileData?.username}</h1>

            {#if profileData.profileId == $currentRoomData?.ownerId}
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

        <h1 id="status">{profileData?.status}</h1>
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
        width: 95%;
        padding: 8px;
        border-radius: 10px;
        transition: 150ms;
    }

    .badge-container {
        display: flex;
        align-items: center;
    }

    .indicator {
        position: fixed;
        background: rgb(56, 212, 42);
        width: 15px;
        height: 15px;
        border-radius: 30px;
        transform: translateX(18px) translateY(11px);
        border: 3px solid var(--bg);
    }

    div:hover {
        background: var(--secondary);
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
        width: 32px;
        height: 32px;
        border-radius: 30px;
        margin-right: 8px;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
        transition: 150ms;
    }

    .top-container {
        display: flex;
        align-items: center;
    }

    #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.05rem;
        color: var(--text);
    }

    .top-container svg {
        width: 20px;
        height: 20px;
        margin-left: 5px;
    }

    #status {
        font-size: 0.9rem;
        color: var(--gray);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>
