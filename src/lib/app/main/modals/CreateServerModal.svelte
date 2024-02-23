<script lang="ts">
    import { dismissModal, showModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { ModalTypes, type ModalData, modalLoading } from 'stores/modals';
    import { isMobile, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';

    let element: HTMLInputElement;

    let errorMessage: string;
    let name = '';

    function createServer(): void {
        if (!name || $modalLoading) return;

        if (name.trim().length == 0) {
            return;
        }

        $modalLoading = true;

        socket.emit(
            'createServer',
            { name: name ? name : '' },
            async ({ err }) => {
                if (err) {
                    // Prettify
                    if (err.name == 'OVER_LIMIT') {
                        showModal(ModalTypes.MaxServers);
                    } else {
                        errorMessage = err.msg;

                        $modalLoading = false;
                    }
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
                createServer();
            }
        };
    });

    const data: ModalData = {
        title: 'Create server',
        actions: [
            {
                title: 'Create',
                callback: createServer,
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

    <div class={`create-container ${$isMobile ? 'mobile' : ''}`}>
        <span class="placeholder">
            <h1>
                {Array.from(name)[0] || '?'}{Array.from(name)[1] || ''}
            </h1></span
        >
        <input
            bind:this={element}
            class="modal-input"
            bind:value={name}
            maxlength={15}
        />
    </div>
</ModalTemplate>

<style>
    .create-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        border: 2px solid transparent;
        transition: 150ms;
        font-weight: 500;
    }

    input:focus {
        border: 2px solid white;
    }

    .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--primary);
        border-radius: 80px;
        width: 100px;
        height: 100px;
        margin: 0;
        padding: 0;
        transition: 125ms;
        margin-top: 20px;
        margin-bottom: 20px;
        user-select: none;
    }

    .placeholder h1 {
        font-size: 1.3rem;
        font-weight: 600;
    }

    .mobile input {
        width: 70vw;
    }
</style>
