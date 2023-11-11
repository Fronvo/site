<script lang="ts">
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { socket } from 'stores/main';

    let isRequesting = false;

    function requestData(): void {
        if (isRequesting) return;

        isRequesting = true;
        setProgressBar(true);

        socket.emit('requestData', ({ err }) => {
            if (err) {
                dismissModal();
            } else {
                dismissModal();
            }
        });
    }

    const data: ModalData = {
        title: 'Request my data',
        actions: [
            {
                title: 'Send data',
                primary: true,
                callback: requestData,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <h1 class="modal-header">Email all of your account's data?</h1>

    <InfoHeader
        marginLeft={'50px'}
        text={'This action can only be used once a month.'}
    />
</ModalTemplate>

<style>
    h1 {
        width: 75%;
        font-size: 1.2rem;
        text-align: start;
    }
</style>
