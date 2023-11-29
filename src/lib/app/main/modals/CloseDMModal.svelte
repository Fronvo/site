<script lang="ts">
    import { dismissModal, setTitle } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { socket } from 'stores/main';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        isInServer,
    } from 'stores/rooms';
    import type { ModalData } from 'stores/modals';
    import { loadRoomsData } from 'utilities/rooms';

    function closeDM(): void {
        socket.emit(
            'closeDM',
            { roomId: $currentRoomData.roomId },
            async () => {
                dismissModal();

                $currentRoomLoaded = false;
                $currentRoomId = undefined;
                $currentRoomData = undefined;
                $currentRoomMessages = [];
                $isInServer = false;

                setTitle('Fronvo');

                await loadRoomsData();
            }
        );
    }

    const data: ModalData = {
        title: 'Close DM',
        actions: [
            { title: 'Close DM', callback: closeDM, danger: true },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <h1 class="modal-header">
        Close your chat with <b
            >{$currentRoomData?.dmUser.username || 'Deleted user'}</b
        >?
    </h1>

    <InfoHeader
        marginLeft={'30px'}
        text={'You will need to be friends with this user to view the messages again'}
    />
</ModalTemplate>

<style>
    h1 {
        font-size: 1.2rem;
        width: 82%;
        text-align: start;
    }
</style>
