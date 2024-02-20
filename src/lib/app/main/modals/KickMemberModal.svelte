<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import {
        type ModalData,
        modalLoading,
        targetMemberModal,
    } from 'stores/modals';
    import { socket } from 'stores/main';
    import { currentServer } from 'stores/rooms';

    function kickMember(): void {
        $modalLoading = true;

        socket.emit(
            'kickMember',
            {
                serverId: $currentServer.serverId,
                profileId: $targetMemberModal.profileId,
            },
            () => {
                dismissModal();
            }
        );
    }

    const data: ModalData = {
        title: 'Kick member',
        actions: [
            { title: 'Kick', callback: kickMember, danger: true },
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <img
        src={$targetMemberModal.avatar
            ? $targetMemberModal.avatar
            : '/images/avatar.png'}
        alt={`${$targetMemberModal.profileId}\'s avatar'`}
        draggable={false}
    />

    <h1>{$targetMemberModal.profileId}</h1>
</ModalTemplate>

<style>
    img {
        width: 128px;
        height: 128px;
        border-radius: 100px;
        margin-top: 15px;
    }

    h1 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        text-align: center;
        margin-bottom: 25px;
    }
</style>
