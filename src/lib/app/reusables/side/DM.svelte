<script lang="ts">
    import { goto } from '$app/navigation';
    import type { FronvoAccount, Room } from 'interfaces/all';
    import {
        DropdownTypes,
        currentDropdownId,
        dropdownDMRoom,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { mousePos, socket } from 'stores/main';
    import { targetProfileModal } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        dmsFilter,
        dmsList,
    } from 'stores/rooms';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { setTitle, showDropdownMouse } from 'utilities/main';

    export let dmData: Room;

    let onlineP = false;
    let dmUser: FronvoAccount;

    let indicator: HTMLDivElement;

    let unsubscribe: Unsubscriber;

    async function enterRoom(): Promise<void> {
        if ($currentRoomId == dmData.roomId) return;

        $currentRoomData = dmData;
        $currentRoomLoaded = false;
        $currentRoomLoaded = true;
        $currentRoomMessages = [];
        $currentRoomId = dmData.roomId;

        setTitle(`@${dmUser.profileId}`);

        // Non-deleted users
        if (dmUser.profileId) {
            goto(`/@${dmUser.profileId}`);
        }

        dmData.unreadCount = 0;
    }

    function showOptions(): void {
        $targetProfileModal = dmUser;
        $dropdownDMRoom = dmData;

        showDropdownMouse(DropdownTypes.DM, $mousePos);
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

    onMount(async () => {
        dmUser = dmData.dmUser;
        onlineP = dmUser.online;

        updateIndicator();

        socket.on('onlineStatusUpdated', async ({ profileId, online }) => {
            if (dmUser.profileId == profileId) {
                dmUser.online = online;
                onlineP = online;

                dmUser = dmUser;

                updateIndicator();
            }
        });

        socket.on(
            'profileDataUpdated',
            async ({ profileId, username, avatar }) => {
                if (dmUser.profileId == profileId) {
                    dmUser.username = username;
                    dmUser.avatar = avatar;

                    dmData = dmData;
                }
            }
        );

        socket.on('profileStatusUpdated', ({ profileId, status }) => {
            if (dmUser.profileId == profileId) {
                dmUser.status = status;

                dmUser = dmUser;
            }
        });

        socket.on('newMessage', ({ roomId, newMessageData }) => {
            // Dont add unreads if were in already
            if ($currentRoomId == roomId) return;

            if (roomId == dmData.roomId) {
                if (
                    newMessageData.profileData.profileId != $ourData.profileId
                ) {
                    dmData.unreadCount += 1;
                }

                dmData = dmData;
            }
        });

        unsubscribe = dmsList.subscribe(() => {
            if ($currentRoomId == dmData.roomId) {
                dmData.unreadCount = 0;
            }

            setTimeout(() => {
                dmUser = dmData.dmUser;
                onlineP = dmUser.online;
            }, 0);
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    $: dmData.unreadCount =
        $currentRoomData != dmData.roomId ? dmData.unreadCount : 0;
</script>

{#if dmUser}
    {#if $dmsFilter.trim().length == 0 || dmUser.username
            ?.toLowerCase()
            .includes($dmsFilter
                    .trim()
                    .toLowerCase()) || dmUser.profileId?.includes($dmsFilter
                .trim()
                .toLowerCase())}
        <div
            class={`dm-container ${
                ($dropdownDMRoom?.roomId == dmData.roomId &&
                    $currentDropdownId == DropdownTypes.DM &&
                    $dropdownVisible) ||
                $currentRoomId == dmData.roomId
                    ? 'active'
                    : ''
            } ${dmData.unreadCount != 0 ? 'unread' : ''}`}
            on:click={enterRoom}
            on:keydown={enterRoom}
            on:contextmenu={(ev) => {
                showOptions();

                ev.preventDefault();
            }}
        >
            <div class="badge-container">
                <img
                    id="avatar"
                    src={dmUser?.avatar
                        ? `${dmUser?.avatar}/tr:w-64:h-64`
                        : '/images/avatar.png'}
                    alt={`${dmUser?.username}\'s avatar'`}
                    draggable={false}
                />

                <div bind:this={indicator} class="indicator" />
            </div>

            <div class="info-container">
                <h1 id="name">
                    {dmUser?.username ? dmUser.username : 'Deleted user'}
                </h1>

                {#if onlineP && dmUser.status}
                    <h1 id="status">{dmUser.status}</h1>
                {/if}
            </div>

            {#if dmData.unreadCount > 0 && $currentRoomId != dmData.roomId}
                <h1 id="unread">
                    {dmData.unreadCount < 10 ? dmData.unreadCount : '9+'}
                </h1>
            {/if}
        </div>
    {/if}
{/if}

<style>
    .dm-container {
        width: 100%;
        height: 46px;
        display: flex;
        align-items: center;
        padding: 5px;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 5px;
        margin-bottom: 2px;
        margin-left: 2px;
        transition: 125ms;
    }

    .dm-container:hover {
        background: var(--primary);
    }

    .dm-container:hover #name,
    .dm-container:hover #status {
        color: white;
    }

    .active {
        background: var(--secondary);
    }

    .active:hover {
        background: var(--primary);
    }

    .dm-container:active {
        background: var(--secondary);
    }

    .info-container {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        flex: 1;
        transform: translateX(-16px);
    }

    .badge-container {
        display: flex;
        align-items: center;
    }

    .indicator {
        width: 10px;
        height: 10px;
        border-radius: 30px;
        transform: translateX(-10px) translateY(12px);
        margin-right: 6px;
        margin-bottom: 2px;
    }

    #name {
        max-width: 130px;
        font-size: 0.95rem;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: 0.1px;
        color: var(--gray);
        transition: 125ms;
        font-weight: 600;
    }

    .active #name {
        color: white;
    }

    .unread #name {
        color: white;
    }

    #status {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--gray);
    }

    .active #status {
        color: white;
    }

    .mark {
        font-weight: 900;
    }

    #avatar {
        width: 32px;
        height: 32px;
        border-radius: 30px;
    }

    #unread {
        font-size: 0.9rem;
        background: white;
        box-shadow: 0 0 5px white;
        border-radius: 100px;
        color: black;
        font-weight: 700;
        padding-right: 5px;
        padding-left: 5px;
    }
</style>
