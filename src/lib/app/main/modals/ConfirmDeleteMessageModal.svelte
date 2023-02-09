<script lang="ts">
    import { socket } from 'stores/all';
    import { targetConfirmCommunityMessage } from 'stores/main';
    import type { ModalData } from 'types/main';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    function deleteMessage(): void {
        // Will recieve result in CommunityChat listener if successful
        setProgressBar(true);

        socket.emit('deleteCommunityMessage', {
            messageId: $targetConfirmCommunityMessage.messageId,
        });
    }

    const data: ModalData = {
        title: 'Delete Message',

        actions: [
            {
                title: 'Delete',
                callback: deleteMessage,
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
    <h1 class="modal-header">Delete this message?</h1>

    <h1 id="content">{$targetConfirmCommunityMessage.content}</h1>
</ModalTemplate>

<style>
    #content {
        color: var(--profile_info_color);
        font-size: 1.8rem;
        margin: 0;
        white-space: pre-wrap;
    }

    @media screen and (max-width: 720px) {
        #content {
            font-size: 1.6rem;
        }
    }

    @media screen and (max-width: 520px) {
        #content {
            font-size: 1.3rem;
        }
    }
</style>
