<script lang="ts">
    import { socket } from 'stores/main';
    import { targetRequestModal, type ModalData } from 'stores/modals';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    function acceptJoinRequest(): void {
        setProgressBar(true);

        socket.emit(
            'acceptJoinRequest',
            {
                email: $targetRequestModal,
            },
            () => {
                dismissModal();
                setProgressBar(false);
            }
        );
    }

    function rejectJoinRequest(): void {
        setProgressBar(true);

        socket.emit(
            'rejectJoinRequest',
            {
                email: $targetRequestModal,
            },
            () => {
                dismissModal();
                setProgressBar(false);
            }
        );
    }

    const data: ModalData = {
        title: 'Edit Request',

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <h1 class="modal-header" id="email">{$targetRequestModal}</h1>

    <button class="modal-button" on:click={acceptJoinRequest}
        >Accept request</button
    >

    <br />

    <button class="modal-button" on:click={rejectJoinRequest}
        >Reject request</button
    >
</ModalTemplate>

<style>
    #email {
        font-size: 2.2rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        margin-bottom: 15px;
        color: var(--profile_info_color);
        text-align: center;
    }

    @media screen and (max-width: 700px) {
        #email {
            font-size: 1.5rem;
        }
    }
</style>
