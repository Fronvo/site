<script lang="ts">
    import { socket } from 'stores/main';
    import {
        type ModalData,
        modalLoading,
        targetChannelModal,
    } from 'stores/modals';
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { currentServer } from 'stores/rooms';

    function deleteChannel(): void {
        $modalLoading = true;

        socket.emit(
            'deleteChannel',
            {
                serverId: $currentServer.serverId,
                channelId: $targetChannelModal.channelId,
            },
            ({ err }) => {
                if (err) {
                    $modalLoading = false;
                } else {
                    dismissModal();
                }
            }
        );
    }

    const data: ModalData = {
        title: 'Delete channel',
        actions: [
            {
                title: 'Delete',
                callback: deleteChannel,
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
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><g fill-rule="evenodd" clip-rule="evenodd"
            ><path
                d="M11.216 6.282a.75.75 0 0 1 .502.934l-.61 2.034h3.434l.74-2.466a.75.75 0 0 1 1.436.432l-.61 2.034H18a.75.75 0 0 1 0 1.5h-2.342l-.75 2.5H17a.75.75 0 0 1 0 1.5h-2.542l-.74 2.465a.75.75 0 0 1-1.436-.43l.61-2.035H9.458l-.74 2.465a.75.75 0 1 1-1.436-.43l.61-2.035H6a.75.75 0 0 1 0-1.5h2.342l.75-2.5H7a.75.75 0 0 1 0-1.5h2.542l.74-2.466a.75.75 0 0 1 .934-.502Zm-.558 4.468h3.434l-.75 2.5H9.908l.75-2.5Z"
            /><path
                d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25ZM2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0Z"
            /></g
        ></svg
    >

    <h1 class="modal-header">{$targetChannelModal.name}</h1>
</ModalTemplate>

<style>
    svg {
        width: 128px;
        height: 128px;
        fill: var(--gray);
        margin-bottom: 5px;
    }

    h1 {
        margin-bottom: 20px;
    }
</style>
