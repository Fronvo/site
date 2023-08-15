<script lang="ts">
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { ModalData } from 'stores/modals';
    import { socket } from 'stores/main';
    import { ourData } from 'stores/profile';
    import AccountInfo from '$lib/app/reusables/top/AccountInfo.svelte';
    import { writable } from 'svelte/store';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { toast } from 'svelte-sonner';

    let status = writable($ourData.status);

    function setStatus(): void {
        if ($status.trim().length == 0) {
            dismissModal();
            return;
        }

        setProgressBar(true);

        socket.emit(
            'updateProfileStatus',
            { status: $status ? $status : '' },
            ({ err }) => {
                if (!err) {
                    $ourData.status = $status;

                    toast(`Status changed to ${$status}`);
                } else {
                    toast('An error has occured');
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
    <AccountInfo
        preview
        editable
        bind:editableStatus={$status}
        editableCallback={setStatus}
    />

    <InfoHeader
        marginLeft={'55px'}
        text={'It will be cleared automatically after 24 hours'}
    />
</ModalTemplate>
