<script lang="ts">
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { targetProfileModal, type ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { socket } from 'stores/main';
    import { toast } from 'svelte-sonner';
    import { currentRoomData, currentRoomId } from 'stores/rooms';

    function removeMember(): void {
        setProgressBar(true);

        socket.emit(
            'removeRoomMember',
            {
                roomId: $currentRoomId,
                profileId: $targetProfileModal.profileId,
            },
            ({ err }) => {
                setProgressBar(false);

                if (!err) {
                    toast(
                        `Removed ${$targetProfileModal.username} from ${$currentRoomData.name}`
                    );
                } else {
                    toast.error(`An error has occured`);
                }

                dismissModal();
            }
        );
    }

    const data: ModalData = {
        title: 'Remove user',
        actions: [
            { title: 'Remove user', callback: removeMember, danger: true },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <h1 class="modal-header">
        Remove <b>{$targetProfileModal.username}</b> from {$currentRoomData.name}?
    </h1>

    <InfoHeader
        marginLeft={'30px'}
        text={'You can add this user back later.'}
    />
</ModalTemplate>

<style>
    h1 {
        font-size: 1.2rem;
        width: 82%;
        text-align: start;
    }
</style>
