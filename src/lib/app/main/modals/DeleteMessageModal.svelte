<script lang="ts">
    import Message from '$lib/app/reusables/rooms/Message.svelte';
    import { socket } from 'stores/main';
    import {
        targetMessageModal,
        targetMessageModalProfile,
        type ModalData,
        modalLoading,
    } from 'stores/modals';
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import {
        currentChannel,
        currentRoomId,
        currentServer,
        isInServer,
    } from 'stores/rooms';

    function deleteMessage(): void {
        $modalLoading = true;

        if (!$isInServer) {
            socket.emit(
                'deleteMessage',
                {
                    roomId: $currentRoomId,
                    messageId: $targetMessageModal.messageId,
                },
                async ({ err }) => {
                    if (err) {
                        $modalLoading = false;
                    } else {
                        dismissModal();
                    }
                }
            );
        } else {
            socket.emit(
                'deleteChannelMessage',
                {
                    serverId: $currentServer.serverId,
                    channelId: $currentChannel.channelId,
                    messageId: $targetMessageModal.messageId,
                },
                async ({ err }) => {
                    if (err) {
                        $modalLoading = false;
                    } else {
                        dismissModal();
                    }
                }
            );
        }
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
        isPreview
    />
</ModalTemplate>
