<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { targetProfileModal } from 'stores/modals';
    import { setProgressBar, showDropdown } from 'utilities/main';
    import { DropdownTypes } from 'stores/dropdowns';
    import { socket } from 'stores/main';
    import { onMount } from 'svelte';

    export let profileData: FronvoAccount;
    export let pending = false;

    let container: HTMLDivElement;

    function acceptFriend(): void {
        setProgressBar(true);

        socket.emit(
            'acceptFriendRequest',
            {
                profileId: profileData.profileId,
            },
            () => {
                setProgressBar(false);
            }
        );
    }

    function rejectFriend(): void {
        setProgressBar(true);

        socket.emit(
            'rejectFriendRequest',
            {
                profileId: profileData.profileId,
            },
            () => {
                setProgressBar(false);
            }
        );
    }

    function showProfileModal(): void {
        $targetProfileModal = profileData;

        showDropdown(DropdownTypes.Profile, container, 'left', -30, 10);
    }

    function showProfileModalNonPending(): void {
        if (pending) return;

        $targetProfileModal = profileData;

        showDropdown(DropdownTypes.Profile, container, 'left', -30, 10);
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
    on:click={showProfileModalNonPending}
    on:keydown={showProfileModalNonPending}
    class={`friend-container ${pending ? 'pending' : ''}`}
    bind:this={container}
>
    <div class="badge-container">
        {#if profileData.avatar}
            <img
                on:click={showProfileModal}
                on:keydown={showProfileModal}
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
                on:click={showProfileModal}
                on:keydown={showProfileModal}
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
        <h1 id="username">{profileData?.username}</h1>

        {#if !pending}
            <h1 id="status">{profileData?.status}</h1>
        {/if}
    </div>

    {#if pending}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
            on:click={acceptFriend}
            on:keydown={acceptFriend}
            ><path
                fill="none"
                stroke="#1CCB00"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m2.75 8.75l3.5 3.5l7-7.5"
            /></svg
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
            on:click={rejectFriend}
            on:keydown={rejectFriend}
            ><path
                fill="none"
                stroke="red"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
            /></svg
        >
    {/if}
</div>

<style>
    .friend-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        cursor: pointer;
        width: 100%;
        padding: 8px;
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
        width: 34px;
        height: 34px;
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

    svg {
        width: 36px;
        height: 36px;
        border-radius: 30px;
        padding: 5px;
    }

    svg:hover {
        background: var(--primary);
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
