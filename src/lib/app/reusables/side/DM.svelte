<script lang="ts">
    import {
        differenceInDays,
        differenceInHours,
        differenceInMinutes,
        differenceInMonths,
        differenceInSeconds,
        differenceInYears,
    } from 'date-fns';
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

    let lastMessageSuffix: string;
    let isTyping: boolean;

    let nameElement: HTMLHeadingElement;

    let unsubscribe: Unsubscriber;

    function updateSuffix(date: string): void {
        const date2 = new Date(date);

        const years = differenceInYears(new Date(), date2);

        const months = differenceInMonths(new Date(), date2);

        const days = differenceInDays(new Date(), date2);

        const hours = differenceInHours(new Date(), date2);

        const minutes = differenceInMinutes(new Date(), date2);

        if (years > 0) {
            lastMessageSuffix = `${years}y`;
        } else if (months > 0) {
            lastMessageSuffix = `${months}mo`;
        } else if (days > 0) {
            lastMessageSuffix = `${days}d`;
        } else if (hours > 0) {
            lastMessageSuffix = `${hours}h`;
        } else if (minutes > 0) {
            lastMessageSuffix = `${minutes}m`;
        } else {
            lastMessageSuffix = 'now';
        }
    }

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
        updateSuffix(dmData.lastMessageAt);

        setInterval(() => updateSuffix(dmData.lastMessageAt), 1000);

        dmUser = dmData.dmUser;
        onlineP = dmUser.online;

        socket.on('onlineStatusUpdated', async ({ profileId, online }) => {
            if (dmUser.profileId == profileId) {
                onlineP = online;
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

                if (newMessageData.message.isTenor) {
                    dmData.lastMessage =
                        newMessageData.profileData.username + ' sent a GIF';
                    dmData.lastMessageFrom = '';
                } else if (newMessageData.message.isSpotify) {
                    dmData.lastMessage =
                        newMessageData.profileData.username +
                        ' shared a Spotify song';
                    dmData.lastMessageFrom = '';
                } else if (newMessageData.message.isImage) {
                    dmData.lastMessage =
                        newMessageData.profileData.username.replace(
                            $ourData.username,
                            'You'
                        ) + ' sent an image';
                } else {
                    dmData.lastMessage = newMessageData.message.content;
                }

                dmData.lastMessageAt = newMessageData.message.creationDate;

                dmData = dmData;

                updateSuffix(newMessageData.message.creationDate);
            }
        });

        socket.on('typingStarted', ({ roomId, profileId }) => {
            if (roomId == dmData.roomId && profileId != $ourData.profileId) {
                isTyping = true;
            }
        });

        socket.on('typingEnded', ({ roomId, profileId }) => {
            if (roomId == dmData.roomId && profileId != $ourData.profileId) {
                isTyping = false;
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
                alt={`${dmUser?.avatar}\'s avatar'`}
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

        {#if onlineP && $ourData.friends.includes(dmUser.profileId)}
            <div class="indicator" />
        {/if}
    </div>

    <div class="info-container">
        <h1 bind:this={nameElement} id="name">{dmUser?.username}</h1>

        <div class="last-wrapper">
            {#if isTyping}
                <h1 id="last">Typing...</h1>
            {:else if onlineP && $ourData.friends.includes(dmUser.profileId) && dmData.unreadCount == 0}
                <h1 id="last">Online now</h1>
            {:else if dmData.lastMessage}
                <h1 id="last" class={`${dmData.unreadCount > 0 ? 'mark' : ''}`}>
                    {dmData.lastMessage.replace($ourData.username, 'You')}
                </h1>

                <h1
                    id="last-end"
                    class={`${dmData.unreadCount > 0 ? 'mark' : ''}`}
                >
                    {' '}•{' '}{lastMessageSuffix}
                </h1>
            {/if}
        </div>
    </div>

    {#if dmData.unreadCount > 0 && $currentRoomId != dmData.roomId}
        <h1 id="unread">{dmData.unreadCount}</h1>
    {/if}
</div>

<style>
    .dm-container {
        display: flex;
        align-items: center;
        padding: 10px;
        margin-left: 5px;
        margin-right: 5px;
        border-radius: 10px;
        transition: 75ms;
        margin-top: 2px;
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

    .dm-container:active {
        transform: scale(0.975);
        opacity: 0.5;
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
        transform: translateX(26px) translateY(16px);
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

    .last-wrapper {
        display: flex;
        align-items: end;
        margin-top: 5px;
        max-width: 190px;
    }

    #last {
        margin: 0;
        font-size: 0.8rem;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        max-width: 155px;
        color: var(--text_gray);
        max-width: 80%;
    }

    #last-end {
        margin: 0;
        font-size: 0.75rem;
        white-space: pre-wrap;
        color: var(--text_gray);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
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
        }

        .info-container {
            display: none;
        }

        #unread {
            display: none;
        }
    }
</style>
