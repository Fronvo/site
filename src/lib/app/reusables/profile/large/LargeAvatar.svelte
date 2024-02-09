<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Room } from 'interfaces/all';
    import { socket } from 'stores/main';
    import {
        ModalTypes,
        targetFriendModal,
        targetProfileModal,
    } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import {
        currentChannel,
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        currentServer,
        dmsList,
        isInServer,
    } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { dismissModal, setTitle, showModal } from 'utilities/main';

    export let avatar: string;
    export let isSelf: boolean;
    export let isFriend: boolean;

    let pending = false;
    let processing = false;

    async function attemptEnterRoom(): Promise<void> {
        for (const dmIndex in $dmsList) {
            const dm = $dmsList[dmIndex] as Room;

            if (dm.dmUser.profileId != $targetProfileModal.profileId) continue;

            if ($currentRoomData?.roomId == dm.roomId) return;

            dm.unreadCount = 0;

            $currentRoomData = dm;
            $currentRoomLoaded = false;
            $currentRoomLoaded = true;
            $currentRoomMessages = [];
            $currentRoomId = dm.roomId;

            $currentChannel = undefined;
            $currentServer = undefined;
            $isInServer = false;

            setTitle(`@${dm.dmUser.profileId}`);
            goto(`/@${dm.dmUser.profileId}`);
        }
    }

    function messageFriend(): void {
        if (
            $currentRoomData?.dmUser.profileId == $targetProfileModal.profileId
        ) {
            dismissModal();

            return;
        }

        attemptEnterRoom();

        socket.emit(
            'createDM',
            {
                profileId: $targetProfileModal.profileId,
            },
            attemptEnterRoom
        );

        dismissModal();
    }

    function removeFriend(): void {
        $targetFriendModal = $targetProfileModal;

        showModal(ModalTypes.RemoveFriend);
    }

    function addFriend(): void {
        if (pending) return;

        socket.emit('addFriend', {
            profileId: $targetProfileModal.profileId,
        });

        pending = true;
    }

    function acceptFriend(): void {
        if (processing) return;

        processing = true;

        socket.emit(
            'acceptFriendRequest',
            {
                profileId: $targetProfileModal.profileId,
            },
            () => {
                processing = false;
            }
        );
    }

    function rejectFriend(): void {
        if (processing) return;

        processing = true;

        socket.emit(
            'rejectFriendRequest',
            {
                profileId: $targetProfileModal.profileId,
            },
            () => {
                processing = false;
            }
        );
    }

    onMount(() => {
        pending = false;
    });
</script>

<div class="top-container">
    <img
        id="avatar"
        src={avatar ? avatar : '/images/avatar.png'}
        alt={`Avatar`}
        draggable={false}
    />

    <span class="placeholder" />

    {#if !isSelf && $targetProfileModal.profileId}
        <div class="options">
            {#if isFriend}
                {#if $currentRoomData?.dmUser.profileId != $targetProfileModal.profileId}
                    <button on:click={messageFriend}>Send message</button>
                {/if}

                <button id="danger" on:click={removeFriend}
                    >Remove friend</button
                >
            {:else if $ourData.pendingFriendRequests.includes($targetProfileModal.profileId)}
                <button
                    class={`${processing ? 'processing' : ''}`}
                    on:click={acceptFriend}>Accept friend request</button
                >

                <button
                    id="danger"
                    class={`${processing ? 'processing' : ''}`}
                    on:click={rejectFriend}>Reject request</button
                >
            {:else}
                <button id={`${pending ? 'pending' : ''}`} on:click={addFriend}
                    >{pending
                        ? 'Friend request pending'
                        : 'Send friend request'}</button
                >
            {/if}
        </div>
    {/if}
</div>

<style>
    .top-container {
        display: flex;
        align-items: center;
        flex: 1;
        width: 100%;
        padding-right: 20px;
    }

    #avatar {
        width: 128px;
        height: 128px;
        border-radius: 100px;
        transition: 150ms;
        margin-left: 20px;
        transform: translateY(-80px);
        background: var(--modal_content_bg);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .placeholder {
        flex: 1;
    }

    .options {
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-35px);
    }

    button {
        font-size: 0.9rem;
        font-weight: 600;
        transition: 125ms;
        margin-right: 5px;
        margin-left: 5px;
    }

    #pending,
    .processing {
        opacity: 0.5;
        cursor: not-allowed;
    }

    #danger {
        background: var(--red);
    }

    #danger:hover {
        background: var(--red_hover);
    }
</style>
