<script lang="ts">
    import Center from '$lib/app/Center.svelte';
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

        extraStyling: ['width: 50%'],
    };
</script>

<ModalTemplate {data}>
    <Center absolute>
        <h1 id="question">Delete this message?</h1>

        <h1 id="content">{$targetConfirmCommunityMessage.content}</h1>
    </Center>
</ModalTemplate>

<style>
    #question {
        font-size: 2.5rem;
    }

    #content {
        color: var(--profile_info_color);
        font-size: 1.8rem;
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
