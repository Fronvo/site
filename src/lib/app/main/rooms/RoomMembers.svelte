<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { findCachedAccount, setTitle } from 'utilities/main';
    import { onDestroy, onMount } from 'svelte';
    import {
        currentChannel,
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        currentServer,
        isInServer,
        currentRoomData as roomData,
    } from 'stores/rooms';
    import { cachedAccountData, socket } from 'stores/main';
    import type { Unsubscriber } from 'svelte/store';
    import RoomMember from '$lib/app/reusables/rooms/RoomMember.svelte';
    import { loadRoomsData } from 'utilities/rooms';
    import { ourData } from 'stores/profile';

    let memberInfo: FronvoAccount[] = [];
    let loadingFinished = false;
    let pending = false;

    let unsubscribe: Unsubscriber;
    let unsubscribe2: Unsubscriber;

    async function loadRoomMembers(): Promise<void> {
        if (pending) return;

        loadingFinished = false;
        pending = true;

        memberInfo = [];

        // Fetch all room members, notify UI once finished
        for (const memberIndex in $currentServer.members) {
            findCachedAccount(
                $currentServer.members[memberIndex],
                $cachedAccountData
            ).then((data) => {
                memberInfo.push(data);

                checkLoadingDone();
            });
        }

        function checkLoadingDone(): void {
            if (!$currentServer) return;

            // Finish loading
            if (memberInfo.length == $currentServer.members.length) {
                loadingFinished = true;
                pending = false;

                memberInfo = memberInfo;
            }
        }
    }

    onMount(async () => {
        unsubscribe = currentRoomLoaded.subscribe(() => {
            loadRoomMembers();
        });

        unsubscribe2 = currentServer.subscribe((server) => {
            if (!server) return;

            loadRoomMembers();
        });
    });

    $: {
        socket.off('memberJoined');
        socket.off('memberLeft');

        socket.on('memberJoined', async ({ roomId, profileId }) => {
            if (roomId == ($currentServer.serverId || $currentRoomId)) {
                $currentServer.members.push(profileId);
                $roomData = $roomData;

                await loadRoomMembers();
                memberInfo = memberInfo;
            }
        });

        socket.on('memberLeft', async ({ roomId, profileId }) => {
            if (roomId == ($currentServer.serverId || $currentRoomId)) {
                // Another client / kicked
                if (profileId == $ourData.profileId) {
                    $currentRoomLoaded = false;
                    $currentRoomId = undefined;
                    $currentRoomData = undefined;
                    $currentRoomMessages = [];
                    $isInServer = false;
                    $currentServer = undefined;
                    $currentChannel = undefined;

                    setTitle('');

                    await loadRoomsData();
                } else {
                    $currentServer.members.splice(
                        $currentServer.members.indexOf(profileId),
                        1
                    );

                    $roomData = $roomData;

                    await loadRoomMembers();
                    memberInfo = memberInfo;
                }
            }
        });
    }

    onDestroy(() => {
        unsubscribe && unsubscribe();
        unsubscribe2 && unsubscribe2();
    });
</script>

<div class="members-container">
    {#if loadingFinished}
        <h1>Members -- {memberInfo.length}</h1>

        {#each memberInfo as profileData}
            <RoomMember {profileData} />
        {/each}
    {/if}
</div>

<style>
    .members-container {
        width: 240px;
        z-index: 1;
        overflow: auto;
        height: 100vh;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-top: 10px;
        padding-left: 10px;
        padding-bottom: 10px;
        user-select: none;
        background: var(--primary);
    }

    .members-container::-webkit-scrollbar {
        width: 12px;
    }

    .members-container::-webkit-scrollbar-thumb {
        background: transparent;
        border: 4px solid var(--primary);
    }

    .members-container:hover.members-container::-webkit-scrollbar-thumb {
        background: var(--bg);
        width: 6px;
    }

    h1 {
        width: 100%;
        font-size: 0.8rem;
        font-weight: 700;
        margin: 0;
        margin-bottom: 5px;
        margin-left: 5px;
        color: var(--gray);
        text-transform: uppercase;
    }
</style>
