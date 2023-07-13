<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { loadRoomsData } from 'utilities/rooms';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { socket } from 'stores/main';
    import type { ModalData } from 'stores/modals';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { toast } from 'svelte-sonner';

    let name: string;
    let icon: Writable<string> = writable('');
    let isCreating = false;
    let errorMessage: string;

    function createRoom(): void {
        if (isCreating || !name) return;

        isCreating = true;

        setProgressBar(true);

        socket.emit(
            'createRoom',
            {
                name,
                icon: $icon,
            },
            async ({ err }) => {
                if (err) {
                    errorMessage = err.msg;
                    isCreating = false;
                    setProgressBar(false);

                    return;
                }

                // Update room panel
                await loadRoomsData();

                dismissModal();

                toast(`Joined ${name}`);
            }
        );
    }

    const data: ModalData = {
        title: 'Create room',
        actions: [
            {
                title: 'Create',
                callback: createRoom,
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
    <ErrorHeader {errorMessage} />

    <input
        placeholder="Room name"
        class="modal-input"
        bind:value={name}
        maxlength={15}
    />
</ModalTemplate>
