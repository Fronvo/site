<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { socket } from 'stores/main';
    import { currentRoomData, currentRoomId } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { toast } from 'svelte-sonner';
    import { setProgressBar } from 'utilities/main';

    export let profileData: FronvoAccount;

    let added = $currentRoomData.members.includes(profileData.profileId);

    function addToRoom(): void {
        if (added) return;

        added = true;

        setProgressBar(true);

        socket.emit(
            'addRoomMember',
            {
                roomId: $currentRoomId,
                profileId: profileData.profileId,
            },
            ({ err }) => {
                setProgressBar(false);
                added = true;

                if (err) {
                    toast('An error has occured');
                }
            }
        );
    }

    onMount(() => {
        socket.on('onlineStatusUpdated', ({ profileId, online }) => {
            if (profileId == profileData.profileId) {
                profileData.online = online;

                // Live sync
                profileData = profileData;
            }
        });
    });
</script>

<div class="add-container">
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
                    fill="var(--branding)"
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

        <h1 id="identifier">@{profileData?.profileId}</h1>
    </div>

    <button class={`${added ? 'added' : ''}`} on:click={addToRoom}>
        {#if !added}
            Add to room
        {:else}
            Added
        {/if}</button
    >
</div>

<style>
    .add-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        width: 350px;
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
        transform: translateX(24px) translateY(16px);
        border: 3px solid var(--bg);
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
        width: 40px;
        height: 40px;
        border-radius: 30px;
        margin-right: 8px;
    }

    #username {
        text-align: start;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1rem;
        color: var(--text);
    }

    svg {
        width: 36px;
        height: 36px;
        border-radius: 30px;
        padding: 5px;
        cursor: default;
    }

    #avatar {
        padding: 0;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    #identifier {
        text-align: start;
        font-size: 0.85rem;
        color: var(--branding);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    button {
        color: white;
        font-size: 0.9rem;
        box-shadow: none;
        transition: 150ms;
        background: var(--branding);
    }

    button:hover {
        background: var(--branding_darken);
    }

    .added {
        color: var(--text);
        background: var(--primary);
        cursor: default;
    }

    .added:hover {
        background: var(--primary);
    }
</style>
