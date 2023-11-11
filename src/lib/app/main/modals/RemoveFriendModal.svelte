<script lang="ts">
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { targetProfileModal, type ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { socket } from 'stores/main';

    function removeFriend(): void {
        setProgressBar(true);

        socket.emit(
            'removeFriend',
            { profileId: $targetProfileModal.profileId },
            () => {
                setProgressBar(false);

                dismissModal();
            }
        );
    }

    const data: ModalData = {
        title: 'Remove friend',
        actions: [
            { title: 'Remove friend', callback: removeFriend, danger: true },
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <h1 class="modal-header">
        Remove <b>{$targetProfileModal.username}</b> from your friends?
    </h1>

    <InfoHeader
        marginLeft={'30px'}
        text={'You will not be able to message this user directly anymore.'}
    />
</ModalTemplate>

<style>
    h1 {
        font-size: 1.2rem;
        width: 82%;
        text-align: start;
    }
</style>
