<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { modalLoading, type ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { socket } from 'stores/main';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';

    let errorMessage: string;

    let password: string;

    function deleteAccount(): void {
        $modalLoading = true;

        socket.emit(
            'deleteAccount',
            {
                password: password ? password : '',
            },
            ({ err }) => {
                if (err) {
                    $modalLoading = false;
                } else {
                    localStorage.clear();

                    dismissModal(() => {
                        location.href = '/';
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

    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><path
            fill-rule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10ZM12 6.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75ZM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
            clip-rule="evenodd"
        /></svg
    >

    <h1 class="modal-header">This can't be undone.</h1>

    <input
        placeholder="Password"
        bind:value={password}
        class="modal-input"
        type="password"
    />
</ModalTemplate>

<style>
    svg {
        width: 128px;
        height: 128px;
        fill: white;
        margin-top: 10px;
        cursor: default;
    }

    h1 {
        margin-bottom: 30px;
    }

    input {
        background: var(--primary);
        border: 2px solid transparent;
        transition: 150ms;
        font-weight: 500;
    }

    input:focus {
        border: 2px solid var(--secondary);
    }
</style>
