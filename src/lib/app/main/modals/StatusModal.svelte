<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { ModalData } from 'stores/modals';
    import { socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import { writable } from 'svelte/store';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import StatusInput from '$lib/app/reusables/status/StatusInput.svelte';

    let status = writable($ourData.status);

    function setStatus(): void {
        if ($status.trim().length == 0) {
            dismissModal();
            return;
        }

        socket.emit(
            'updateProfileStatus',
            { status: $status ? $status : '' },
            ({ err }) => {
                if (!err) {
                    $ourData.status = $status;
                }

                dismissModal();
            }
        );
    }

    const data: ModalData = {
        title: 'Set a status',
        actions: [
            {
                title: 'Set status',
                callback: setStatus,
                primary: true,
            },

            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <StatusInput {status} statusCallback={setStatus} />

    <InfoHeader
        marginLeft={'55px'}
        text={'It will be cleared automatically after 24 hours'}
    />
</ModalTemplate>
