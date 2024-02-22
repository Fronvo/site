<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { type ModalData, modalLoading } from 'stores/modals';
    import { socket } from 'stores/main';
    import { onMount } from 'svelte';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';

    let element: HTMLInputElement;

    let errorMessage: string;
    let invite = '';

    function joinServer(): void {
        if (!invite || $modalLoading) return;

        if (invite.trim().length == 0) {
            return;
        }

        $modalLoading = true;

        socket.emit(
            'joinServer',
            { invite: invite ? invite : '' },
            async ({ err }) => {
                if (err) {
                    errorMessage = err.msg;

                    $modalLoading = false;
                } else {
                    dismissModal();
                }
            }
        );
    }

    onMount(() => {
        element.focus();

        element.onkeyup = (ev) => {
            if (ev.key == 'Enter') {
                joinServer();
            }
        };
    });

    const data: ModalData = {
        title: 'Join server',
        actions: [
            {
                title: 'Join',
                callback: joinServer,
                primary: true,
            },

            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <ErrorHeader size={'1.2rem'} {errorMessage} />

    <div class="single">
        <h1>/invite/</h1>

        <input
            bind:this={element}
            class="modal-input"
            bind:value={invite}
            maxlength={8}
        />
    </div>
</ModalTemplate>

<style>
    .single {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        padding-left: 10px;
        padding-right: 10px;
    }

    h1 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: white;
        margin-right: 5px;
        margin-bottom: 10px;
    }

    input {
        border: 2px solid transparent;
        transition: 150ms;
        font-weight: 500;
    }

    input:focus {
        border: 2px solid white;
    }
</style>
