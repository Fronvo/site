<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { socket } from 'stores/main';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';

    let errorMessage: string;

    let isDeleting = false;
    let password: string;
    let deleteStr: string;

    function deleteAccount(): void {
        if (isDeleting || deleteStr != 'delete my account') return;

        isDeleting = true;

        socket.emit(
            'deleteAccount',
            {
                password: password ? password : '',
            },
            ({ err }) => {
                if (err) {
                    isDeleting = false;

                    errorMessage = err.msg;
                } else {
                    localStorage.clear();

                    dismissModal(() => {
                        location.href = '/app';
                    });
                }
            }
        );
    }

    const data: ModalData = {
        title: 'Delete account',
        actions: [
            {
                title: 'Delete account',
                danger: true,
                callback: deleteAccount,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <ErrorHeader {errorMessage} size="1.2rem" />

    <h1 class="modal-header">Enter your password below</h1>

    <input bind:value={password} class="modal-input" type="password" />

    <h1 class="modal-header">
        Type <b>delete my account</b> below
    </h1>

    <input bind:value={deleteStr} class="modal-input" />

    <InfoHeader marginLeft={'40px'} text={"This can't be undone!"} />
</ModalTemplate>

<style>
    h1 {
        width: 80%;
        text-align: start;
        font-size: 1.2rem;
        margin-top: 10px;
    }

    h1 b {
        letter-spacing: 1px;
        font-size: 1.1rem;
    }

    input {
        width: 80%;
        font-size: 1.1rem;
        margin-top: 10px;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        color: var(--text);
        border: 2px solid transparent;
        transition: 150ms border;
    }

    input:focus {
        border: 2px solid #0e62ff;
    }
</style>
