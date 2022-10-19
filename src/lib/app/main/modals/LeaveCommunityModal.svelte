<script lang="ts">
    import { goto } from '$app/navigation';
    import {
        joinedCommunity,
        targetCommunity,
        targetCommunityData,
    } from 'stores/communities';
    import { socket } from 'stores/all';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import { dismissModal } from 'utilities/main';
    import { ourProfileData } from 'stores/profile';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import Center from '$lib/app/Center.svelte';

    let isLeaving = false;

    function isOwner(): boolean {
        return $joinedCommunity.ownerId == $ourProfileData.profileId;
    }

    function leaveCommunity(): void {
        if (isLeaving) return;

        isLeaving = true;

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
    <Center absolute>
        {#if $joinedCommunity}
            <h1 id="leave-community">
                {isOwner() ? 'Delete' : 'Leave'} the
                <span>{$joinedCommunity.name}</span> community?
            </h1>
        {/if}
    </Center>
</ModalTemplate>

<style>
    h1 {
        font-size: 3rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
    }

    h1 span {
        color: var(--profile_info_color);
    }

    @media screen and (max-width: 720px) {
        h1 {
            font-size: 2rem;
        }
    }

    @media screen and (max-width: 520px) {
        h1 {
            font-size: 1.7rem;
        }
    }
</style>
