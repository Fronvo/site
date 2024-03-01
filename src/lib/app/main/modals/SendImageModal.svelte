<script lang="ts">
    import {
        targetImageModal,
        type ModalData,
        sendImageTargetFile,
        modalLoading,
    } from 'stores/modals';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { dismissModal } from 'utilities/main';
    import {
        currentChannel,
        currentRoomId,
        currentServer,
        isInServer,
        sendingImage,
    } from 'stores/rooms';
    import { ourData } from 'stores/profile';
    import { sendImage } from 'utilities/rooms';

    async function sendImageFunc(): Promise<void> {
        if ($sendingImage) return;

        $modalLoading = true;

        const reader = new FileReader();

        reader.addEventListener('load', async () => {
            await sendImage(
                $currentChannel?.channelId || $currentRoomId,
                $sendingImage,
                reader.result,
                $ourData.isTurbo,
                $isInServer ? $currentServer.serverId : ''
            );

            dismissModal();
        });

        reader.readAsDataURL($sendImageTargetFile);
    }

    const data: ModalData = {
        actions: [
            {
                title: 'Send image',
                callback: sendImageFunc,
                primary: true,
            },
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],

        transparent: true,
        noDecoration: true,
    };
</script>

<ModalTemplate {data}>
    <img src={$targetImageModal} draggable={false} alt={'Image'} />
</ModalTemplate>

<style>
    img {
        max-width: calc(100vw);
        max-height: calc(80vh);
        overflow: hidden;
        border-radius: 10px;
    }
</style>
