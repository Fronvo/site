<script lang="ts">
    import type { FronvoAccount, Room } from 'interfaces/all';
    import { socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        dmsFilter,
        roomsList,
    } from 'stores/rooms';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { setTitle } from 'utilities/main';
    import { loadRoomMessages } from 'utilities/rooms';

    export let dmData: Room;

    let onlineP = false;
    let dmUser: FronvoAccount;

    let nameElement: HTMLHeadingElement;
    let indicator: HTMLDivElement;

    let unsubscribe: Unsubscriber;

    async function enterRoom(): Promise<void> {
        if ($currentRoomId == dmData.roomId) return;

        $currentRoomId = dmData.roomId;

        nameElement.style.fontWeight = '300';

        $currentRoomMessages = await loadRoomMessages(dmData.roomId);
        $currentRoomData = dmData;

        $currentRoomLoaded = false;
        $currentRoomLoaded = true;
    }

    onMount(async () => {
        dmUser = dmData.dmUser;
        onlineP = dmUser.online;

        setTimeout(() => {
            if (onlineP) {
                indicator.style.visibility = 'visible';
            }
        }, 0);

        socket.on('onlineStatusUpdated', async ({ profileId, online }) => {
            if (dmUser.profileId == profileId) {
                onlineP = online;

                setTimeout(() => {
                    if (online) {
                        indicator.style.visibility = 'visible';
                    } else {
                        indicator.style.visibility = 'hidden';
                    }
                }, 0);
            }
        });

        socket.on(
            'profileDataUpdated',
            async ({ profileId, username, avatar }) => {
                if (dmUser.profileId == profileId) {
                    dmData.name = username;
                    dmData.icon = avatar;

                    setTitle(username);
                }
            }
        );

        socket.on('newRoomMessage', ({ roomId, newMessageData }) => {
            if (roomId == dmData.roomId) {
                if (
                    newMessageData.profileData.profileId != $ourData.profileId
                ) {
                    dmData.unreadCount += 1;
                }

                dmData = dmData;
            }
        });

        unsubscribe = roomsList.subscribe(() => {
            if ($currentRoomId == dmData.roomId) {
                dmData.unreadCount = 0;
            }

            setTimeout(() => {
                dmUser = dmData.dmUser;
            }, 0);
        });

        roomsList.subscribe(async (state) => {
            if (!state) return;

            dmUser = dmData.dmUser;
            onlineP = dmUser.online;
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    $: dmData.unreadCount =
        $currentRoomId != dmData.roomId ? dmData.unreadCount : 0;
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
                $currentRoomId == dmData.roomId ? 'active' : ''
            }`}
            on:click={enterRoom}
            on:keydown={enterRoom}
        >
            <div class="badge-container">
                {#if dmUser?.avatar}
                    <img
                        id="avatar"
                        src={dmUser?.avatar}
                        alt={`${dmUser?.username}\'s avatar'`}
                    />
                {:else}
                    <img
                        src="/images/avatar.svg"
                        draggable={false}
                        alt="Avatar"
                        id="avatar"
                    />
                {/if}

                <div bind:this={indicator} class="indicator" />
            </div>

            <div class="info-container">
                <h1 bind:this={nameElement} id="name">
                    {dmUser?.username ? dmUser.username : 'Deleted user'}
                </h1>
            </div>

            {#if dmData.unreadCount > 0 && $currentRoomId != dmData.roomId}
                <h1 id="unread">{dmData.unreadCount}</h1>
            {/if}
        </div>
    {/if}
{/if}

<style>
    .dm-container {
        width: 90%;
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
        border-radius: 10px;
        margin-bottom: 5px;
    }

    .dm-container:hover {
        background: var(--secondary);
    }

    .active {
        background: var(--tertiary);
    }

    .active:hover {
        background: var(--tertiary);
    }

    .info-container {
        margin-left: 10px;
        flex: 1;
        transform: translateX(-16px);
    }

    .badge-container {
        display: flex;
        align-items: center;
    }

    .indicator {
        background: rgb(56, 212, 42);
        width: 16px;
        height: 16px;
        border-radius: 30px;
        transform: translateX(-17px) translateY(14px);
        border: 3px solid var(--primary);
        visibility: hidden;
    }

    #name {
        font-size: 0.95rem;
        margin: 0;
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        letter-spacing: 0.1px;
        font-weight: 500;
        color: rgb(179, 180, 184);
    }

    .mark {
        font-weight: 900;
    }

    #avatar {
        width: 36px;
        height: 36px;
        border-radius: 30px;
    }

    #unread {
        display: flex;
        font-size: 0.9rem;
        margin: 0;
        background: rgb(255, 33, 33);
        box-shadow: 0 0 3px red;
        border-radius: 5px;
        padding: 5px;
        color: white;
        font-weight: 900;
    }
</style>
