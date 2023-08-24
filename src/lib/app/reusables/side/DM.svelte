<script lang="ts">
    import type { FronvoAccount, Room } from 'interfaces/all';
    import { socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        roomsList,
    } from 'stores/rooms';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { setTitle } from 'utilities/main';
    import { loadRoomMessages } from 'utilities/rooms';

    export let dmData: Room;

    let onlineP: boolean;
    let dmUser: FronvoAccount;

    let nameElement: HTMLHeadingElement;
    let indicator: HTMLDivElement;

    let unsubscribe: Unsubscriber;

    async function enterRoom(): Promise<void> {
        if ($currentRoomId == dmData.roomId) return;

        nameElement.style.fontWeight = '300';

        $currentRoomId = dmData.roomId;
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
            } else {
                indicator.style.visibility = 'hidden';
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

<div
    class={`dm-container ${$currentRoomId == dmData.roomId ? 'active' : ''}`}
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

<style>
    .dm-container {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px 5px 10px 10px;
        transition: 75ms;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .dm-container:hover {
        background: var(--primary);
    }

    .active {
        background: var(--primary);
    }

    .active:hover {
        background: var(--secondary);
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
        transform: translateX(-17px) translateY(16px);
        border: 3px solid var(--bg);
    }

    #name {
        font-size: 1rem;
        margin: 0;
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        letter-spacing: 0.1px;
        font-weight: 500;
    }

    .mark {
        font-weight: 900;
    }

    #avatar {
        width: 44px;
        height: 44px;
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

    @media screen and (max-width: 1250px) {
        .dm-container {
            width: max-content;
            justify-content: center;
        }

        .info-container {
            display: none;
        }

        #unread {
            display: none;
        }
    }
</style>
