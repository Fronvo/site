<script lang="ts">
    import { targetJoinRequestEmail } from 'stores/main';
    import { socket } from 'stores/all';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    function acceptJoinRequest(): void {
        setProgressBar(true);

        socket.emit(
            'acceptJoinRequest',
            {
                email: $targetJoinRequestEmail,
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
                email: $targetJoinRequestEmail,
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
    <h1 id="email">{$targetJoinRequestEmail}</h1>

    <button on:click={acceptJoinRequest}>Accept request</button>

    <br />

    <button on:click={rejectJoinRequest}>Reject request</button>
</ModalTemplate>

<style>
    button {
        font-size: 1.8rem;
        width: max-content;
    }

    #email {
        font-size: 2.2rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        margin-bottom: 15px;
        color: var(--profile_info_color);
        text-align: center;
    }

    @media screen and (max-width: 720px) {
        button {
            font-size: 1.6rem;
        }

        #email {
            font-size: 1.9rem;
        }
    }

    @media screen and (max-width: 520px) {
        button {
            font-size: 1.4rem;
        }

        #email {
            font-size: 1.5rem;
        }
    }
</style>
