<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import {
        type ModalData,
        targetFriendModal,
        modalLoading,
    } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { socket } from 'stores/main';

    function removeFriend(): void {
        $modalLoading = true;

        socket.emit(
            'removeFriend',
            { profileId: $targetFriendModal.profileId },
            () => {
                dismissModal();
            }
        );
    }

    const data: ModalData = {
        title: 'Remove friend',
        actions: [
            { title: 'Remove', callback: removeFriend, danger: true },
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <img
        src={$targetFriendModal.avatar
            ? $targetFriendModal.avatar
            : '/images/avatar.png'}
        alt={`${$targetFriendModal.profileId}\'s avatar'`}
        draggable={false}
    />

    <h1>{$targetFriendModal.profileId}</h1>
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
