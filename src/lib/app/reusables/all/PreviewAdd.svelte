<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { socket } from 'stores/main';
    import { currentRoomData, currentRoomId } from 'stores/rooms';
    import { onMount } from 'svelte';

    export let profileData: FronvoAccount;

    let added = $currentRoomData.members.includes(profileData.profileId);

    function addToRoom(): void {
        if (added) return;

        added = true;

        socket.emit(
            'addRoomMember',
            {
                roomId: $currentRoomId,
                profileId: profileData.profileId,
            },
            () => {
                added = true;
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
            <img
                id="avatar"
                src={'/images/avatar.svg'}
                alt={`${profileData.username}'s avatar`}
                draggable={false}
            />
        {/if}

        {#if profileData.online}
            <div class="indicator" />
        {/if}
    </div>

    <div class="bottom-container">
        <h1 id="identifier">{profileData?.profileId}</h1>
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
        font-size: 1rem;
        color: var(--text);
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
