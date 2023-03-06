<script lang="ts">
    import Message from '$lib/app/reusables/communities/Message.svelte';
    import { socket } from 'stores/main';
    import {
        targetMessageModal,
        targetMessageModalProfile,
        type ModalData,
    } from 'stores/modals';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    function deleteMessage(): void {
        // Will recieve result in CommunityChat listener if successful
        setProgressBar(true);

        socket.emit('deleteCommunityMessage', {
            messageId: $targetMessageModal.messageId,
        });
    }

    const data: ModalData = {
        title: 'Delete Message',

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

        removeTransparency: true,
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
