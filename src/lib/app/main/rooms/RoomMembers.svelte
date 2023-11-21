<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { findCachedAccount, setTitle } from 'utilities/main';
    import { onDestroy, onMount } from 'svelte';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        currentRoomData as roomData,
    } from 'stores/rooms';
    import { cachedAccountData, socket } from 'stores/main';
    import type { Unsubscriber } from 'svelte/store';
    import RoomMember from '$lib/app/reusables/rooms/RoomMember.svelte';
    import InviteButton from '$lib/app/reusables/rooms/InviteButton.svelte';
    import LeaveRoomButton from '$lib/app/reusables/rooms/LeaveServerButton.svelte';
    import { loadRoomsData } from 'utilities/rooms';
    import { ourData } from 'stores/profile';
    import { fade } from 'svelte/transition';

    let memberInfo: FronvoAccount[] = [];
    let loadingFinished = false;
    let pending = false;

    let unsubscribe: Unsubscriber;

    async function loadRoomMembers(): Promise<void> {
        if (!$roomData || pending) return;

        loadingFinished = false;
        pending = true;

        memberInfo = [];

        // Fetch all room members, notify UI once finished
        for (const memberIndex in $roomData.members) {
            findCachedAccount(
                $roomData.members[memberIndex],
                $cachedAccountData
            ).then((data) => {
                memberInfo.push(data);

                checkLoadingDone();
            });
        }

        function checkLoadingDone(): void {
            // Finish loading
            if (memberInfo.length == $roomData?.members.length) {
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
    });

    $: {
        socket.off('memberJoined');
        socket.off('memberLeft');

        socket.on('memberJoined', async ({ roomId, profileId }) => {
            if (roomId == $currentRoomId) {
                $roomData?.members.push(profileId);
                $roomData = $roomData;

                await loadRoomMembers();
                memberInfo = memberInfo;
            }
        });

        socket.on('memberLeft', async ({ roomId, profileId }) => {
            if (roomId == $currentRoomId) {
                // Another client / kicked
                if (profileId == $ourData.profileId) {
                    $currentRoomLoaded = false;
                    $currentRoomId = undefined;
                    $currentRoomData = undefined;
                    $currentRoomMessages = [];

                    setTitle('Fronvo');

                    await loadRoomsData();
                } else {
                    $roomData?.members.splice(
                        $roomData?.members.indexOf(profileId),
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
    });
</script>

<div class="members-container" in:fade={{ duration: 150 }}>
    {#if loadingFinished}
        {#each memberInfo as profileData}
            <RoomMember {profileData} />
        {/each}

        <hr />

        {#if memberInfo.length < 10}
            <InviteButton />
        {/if}

        <LeaveRoomButton />
    {/if}
</div>

<style>
    .members-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 275px;
        padding-top: 10px;
        z-index: 2;
        overflow: auto;
        height: calc(100vh - 65px);
    }

    hr {
        width: 100%;
        height: 5px;
        background: var(--bg);
        border: 1px solid var(--bg);
    }
</style>
