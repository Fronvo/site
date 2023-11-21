<script lang="ts">
    import { dismissModal, showModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { ModalTypes, type ModalData, modalLoading } from 'stores/modals';
    import { socket } from 'stores/main';
    import { onMount } from 'svelte';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { loadRoomsData } from 'utilities/rooms';

    let element: HTMLInputElement;

    let errorMessage: string;
    let name = '';

    function createRoom(): void {
        if (!name || $modalLoading) return;

        if (name.trim().length == 0) {
            return;
        }

        $modalLoading = true;

        socket.emit(
            'createRoom',
            { name: name ? name : '' },
            async ({ err }) => {
                if (err) {
                    // Prettify
                    if (err.name == 'OVER_LIMIT') {
                        showModal(ModalTypes.MaxRooms);
                    } else {
                        errorMessage = err.msg;

                        $modalLoading = false;
                    }
                } else {
                    dismissModal();

                    await loadRoomsData();
                }
            }
        );
    }

    onMount(() => {
        element.focus();

        element.onkeyup = (ev) => {
            if (ev.key == 'Enter') {
                createRoom();
            }
        };
    });

    const data: ModalData = {
        title: 'Create server',
        actions: [
            {
                title: 'Create',
                callback: createRoom,
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

    <div class="friend-container">
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
    .friend-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        background: var(--bg);
        border: 2px solid var(--bg);
        transition: 150ms;
    }

    input:focus {
        border: 2px solid var(--branding);
    }

    .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg);
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
</style>
