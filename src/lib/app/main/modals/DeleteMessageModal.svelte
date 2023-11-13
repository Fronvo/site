<script lang="ts">
    import Message from '$lib/app/reusables/rooms/Message.svelte';
    import { socket } from 'stores/main';
    import {
        targetMessageModal,
        targetMessageModalProfile,
        type ModalData,
    } from 'stores/modals';
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { currentRoomId } from 'stores/rooms';

    function deleteMessage(): void {
        // Will receive result in RoomChat listener if successful

        socket.emit(
            'deleteRoomMessage',
            {
                roomId: $currentRoomId,
                messageId: $targetMessageModal.messageId,
            },
            async ({ err }) => {
                if (err) return;
            }
        );
    }

    const data: ModalData = {
        title: 'Delete message',
        actions: [
            {
                title: 'Delete',
                callback: deleteMessage,
                danger: true,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <Message
        messageData={$targetMessageModal}
        profileData={$targetMessageModalProfile}
        hideOptions
        isPreview
    />
</ModalTemplate>
