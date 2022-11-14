<script lang="ts">
    import { socket } from 'stores/all';
    import { targetConfirmCommunityMessage } from 'stores/main';
    import type { ModalData } from 'types/main';
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    function deleteMessage(): void {
        // Will recieve result in CommunityChat listener if successful
        socket.emit('deleteCommunityMessage', {
            messageId: $targetConfirmCommunityMessage.messageId,
        });

        dismissModal();
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
    <h1 id="question">Delete this message?</h1>

    <h1 id="content">{$targetConfirmCommunityMessage.content}</h1>
</ModalTemplate>

<style>
    #question {
        font-size: 2.5rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #content {
        color: var(--profile_info_color);
        font-size: 1.8rem;
        margin: 0;
        white-space: pre-wrap;
    }

    @media screen and (max-width: 720px) {
        #question {
            font-size: 2.2rem;
        }

        #content {
            font-size: 1.6rem;
        }
    }

    @media screen and (max-width: 520px) {
        #question {
            font-size: 1.9rem;
        }

        #content {
            font-size: 1.3rem;
        }
    }
</style>
