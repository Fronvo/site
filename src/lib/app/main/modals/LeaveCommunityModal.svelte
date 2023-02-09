<script lang="ts">
    import { goto } from '$app/navigation';
    import {
        joinedCommunity,
        targetCommunity,
        targetCommunityData,
    } from 'stores/communities';
    import { socket } from 'stores/all';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { ourProfileData } from 'stores/profile';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    let isLeaving = false;

    function isOwner(): boolean {
        return $joinedCommunity.ownerId == $ourProfileData.profileId;
    }

    function leaveCommunity(): void {
        if (isLeaving) return;

        isLeaving = true;
        setProgressBar(true);

        socket.emit('leaveCommunity', ({ err }) => {
            if (!err) {
                dismissModal(() => {
                    $joinedCommunity = undefined;
                    $targetCommunity = undefined;
                    $targetCommunityData = undefined;

                    loadCommunitiesPanel();

                    goto('/community', {
                        replaceState: true,
                    });
                });
            } else {
                isLeaving = false;
                setProgressBar(false);
            }
        });
    }

    const data: ModalData = {
        title: `${isOwner() ? 'Delete' : 'Leave'} Community`,

        actions: [
            {
                title: `Yes, ${isOwner() ? 'delete' : 'leave'}`,
                callback: leaveCommunity,
            },
            {
                title: `No, ${isOwner() ? 'keep' : 'stay'}`,
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if $joinedCommunity}
        <h1 class="modal-header">
            {isOwner() ? 'Delete' : 'Leave'} the
            <span>{$joinedCommunity.name}</span> community?
        </h1>
    {/if}
</ModalTemplate>

<style>
</style>
