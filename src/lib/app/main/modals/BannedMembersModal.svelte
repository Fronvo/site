<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { dismissModal, findCachedAccount } from 'utilities/main';
    import { cachedAccountData } from 'stores/main';
    import { onDestroy, onMount } from 'svelte';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { ModalData } from 'stores/modals';
    import type { Unsubscriber } from 'svelte/motion';
    import { currentServer, serversList } from 'stores/rooms';
    import BannedMember from '$lib/app/reusables/rooms/BannedMember.svelte';

    let bannedInfo: FronvoAccount[] = [];
    let loadingFinished = false;
    let pending = false;

    let unsubscribe: Unsubscriber;

    async function loadBannedMembers(): Promise<void> {
        if (pending) return;

        loadingFinished = false;
        pending = true;

        bannedInfo = [];

        // Fetch all room members, notify UI once finished
        for (const memberIndex in $currentServer?.bannedMembers) {
            findCachedAccount(
                $currentServer.bannedMembers[memberIndex],
                $cachedAccountData
            ).then((data) => {
                bannedInfo.push(data);

                checkLoadingDone();
            });
        }

        function checkLoadingDone(): void {
            // Finish loading
            if (bannedInfo.length == $currentServer?.bannedMembers.length) {
                loadingFinished = true;
                pending = false;

                bannedInfo = bannedInfo;
            }
        }
    }

    onMount(() => {
        loadBannedMembers();

        unsubscribe = serversList.subscribe((servers) => {
            if (!servers) return;

            // Loop servers
            for (const serverIndex in servers) {
                const server = servers[serverIndex];

                if (server.serverId == $currentServer.serverId) {
                    // 0 banned, dismiss
                    if (server.bannedMembers.length == 0) {
                        dismissModal();
                        return;
                    }

                    // Pending changed, update
                    if (bannedInfo.length != server.bannedMembers.length)
                        loadBannedMembers();

                    break;
                }
            }
        });
    });

    onDestroy(() => {
        unsubscribe();
    });

    const data: ModalData = {
        title: 'Banned members',
        actions: [
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <div class="members-container">
        {#if loadingFinished}
            {#each bannedInfo as profileData}
                <BannedMember {profileData} />
            {/each}
        {/if}
    </div>
</ModalTemplate>

<style>
    .members-container {
        z-index: 1;
        overflow: auto;
        overflow-y: scroll;
        overflow-x: hidden;
        user-select: none;
        width: 350px;
        border-radius: 10px;
    }

    .members-container::-webkit-scrollbar {
        width: 6px;
    }

    .members-container::-webkit-scrollbar-thumb {
        border: 6px solid transparent;
        background: transparent;
    }

    .members-container:hover.members-container::-webkit-scrollbar-thumb {
        background: var(--tertiary);
        width: 12px;
    }
</style>
