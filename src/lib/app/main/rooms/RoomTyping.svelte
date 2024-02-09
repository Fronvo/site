<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { cachedAccountData, socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import {
        currentChannel,
        currentRoomId,
        currentServer,
        sendContent,
    } from 'stores/rooms';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/motion';
    import { writable, type Writable } from 'svelte/store';
    import { findCachedAccount } from 'utilities/main';

    let unsubscribe: Unsubscriber;
    let typingSent = false;
    let typing: Writable<FronvoAccount[]> = writable([]);
    let tempTyping: string[] = [];

    onMount(() => {
        unsubscribe = sendContent.subscribe((text) => {
            if (text.length == 0) {
                if (!typingSent) return;

                typingSent = false;

                socket.emit('finishTyping', {
                    serverId: $currentServer?.serverId,
                    roomId: $currentChannel?.channelId || $currentRoomId,
                });
            } else {
                if (typingSent) return;

                typingSent = true;

                socket.emit('startTyping', {
                    serverId: $currentServer?.serverId,
                    roomId: $currentChannel?.channelId || $currentRoomId,
                });
            }
        });
    });

    socket.on('typingStarted', async ({ roomId, profileId }) => {
        if (tempTyping.includes(profileId)) return;

        tempTyping.push(profileId);

        if (roomId == ($currentChannel?.channelId || $currentRoomId)) {
            if (profileId == $ourData.profileId) return;

            $typing.push(
                await findCachedAccount(profileId, $cachedAccountData)
            );

            $typing = $typing;
        }
    });

    socket.on('typingEnded', async ({ roomId, profileId }) => {
        if (roomId == ($currentChannel?.channelId || $currentRoomId)) {
            if (profileId == $ourData.profileId) return;

            const account = await findCachedAccount(
                profileId,
                $cachedAccountData
            );

            // Might have missed the start event
            if ($typing.includes(account)) {
                $typing.splice($typing.indexOf(account), 1);
                $typing = $typing;

                tempTyping.splice(tempTyping.indexOf(profileId), 1);
            }
        }
    });

    onDestroy(() => unsubscribe());
</script>

<div class={`typing-container ${$typing.length > 0 ? 'show' : ''}`}>
    <span id="dot-1" />
    <span id="dot-2" />
    <span id="dot-3" />

    <div class="info">
        {#each $typing as { profileId, username, avatar }, i}
            <!-- Up to 4 avatars -->
            {#if i < 3}
                <img
                    src={avatar
                        ? `${avatar}/tr:w-32:h-32`
                        : '/images/avatar.png'}
                    draggable={false}
                    alt={`${profileId}\'s avatar'`}
                />

                <h1>
                    {username}{$typing.length > 1 && i != $typing.length - 1
                        ? ','
                        : ''}
                </h1>
            {/if}
        {/each}
    </div>

    <h1 id="final">
        {$typing.length > 3 ? 'and more' : ''} typing...
    </h1>
</div>

<style>
    .typing-container {
        width: 97.5%;
        height: 10px;
        display: flex;
        align-items: center;
        margin-left: 10px;
        user-select: none;
        transform: translateY(-5px);
        opacity: 0;
    }

    .show {
        opacity: 1;
    }

    span {
        width: 6px;
        height: 6px;
        background: var(--primary);
        border-radius: 100px;
        margin-right: 2px;
        animation-name: glowing;
        animation-duration: 1000ms;
        animation-iteration-count: infinite;
        animation-direction: alternate-reverse;
    }

    #dot-1 {
        animation-delay: 0;
    }

    #dot-2 {
        animation-delay: 150ms;
    }

    #dot-3 {
        animation-delay: 300ms;
        margin-right: 5px;
    }

    .typing-container .info {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .typing-container .info img {
        width: 16px;
        height: 16px;
        border-radius: 30px;
        margin-right: 2px;
    }

    .typing-container .info h1 {
        margin: 0;
        font-size: 0.9rem;
        margin-right: 3px;
        margin-bottom: 2px;
        color: white;
    }

    .typing-container #final {
        margin: 0;
        font-size: 0.9rem;
        margin-bottom: 2px;
    }

    @keyframes glowing {
        100% {
            background: var(--gray);
            transform: scale(1.05);
        }
    }
</style>
