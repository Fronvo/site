<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { dismissModal, findCachedAccount } from 'utilities/main';
    import { cachedAccountData, socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import { onDestroy, onMount } from 'svelte';
    import FriendPending from '$lib/app/reusables/top/FriendPending.svelte';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { ModalData } from 'stores/modals';
    import type { Unsubscriber } from 'svelte/motion';

    let pendingInfo: FronvoAccount[] = [];
    let loadingFinished = false;
    let pending = false;

    let unsubscribe: Unsubscriber;

    async function loadPendingFriends(): Promise<void> {
        if (pending) return;

        loadingFinished = false;
        pending = true;

        pendingInfo = [];

        // Fetch all room members, notify UI once finished
        for (const memberIndex in $ourData.pendingFriendRequests) {
            findCachedAccount(
                $ourData.pendingFriendRequests[memberIndex],
                $cachedAccountData
            ).then((data) => {
                pendingInfo.push(data);

                checkLoadingDone();
            });
        }

        function checkLoadingDone(): void {
            // Finish loading
            if (pendingInfo.length == $ourData.pendingFriendRequests.length) {
                loadingFinished = true;
                pending = false;

                pendingInfo = pendingInfo;
            }
        }
    }

    onMount(() => {
        loadPendingFriends();

        unsubscribe = ourData.subscribe((data) => {
            if (!data) return;

            // 0 pending, dismiss
            if (data.pendingFriendRequests.length == 0) {
                dismissModal();
                return;
            }

            // Pending changed, update
            if (pendingInfo.length != data.pendingFriendRequests.length)
                loadPendingFriends();
        });
    });

    onDestroy(() => {
        unsubscribe();
    });

    const data: ModalData = {
        title: 'Pending requests',
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
            {#each pendingInfo as profileData}
                <FriendPending {profileData} />
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
