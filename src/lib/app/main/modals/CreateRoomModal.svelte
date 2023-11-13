<script lang="ts">
    import { dismissModal, showModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { ModalTypes, type ModalData } from 'stores/modals';
    import { socket } from 'stores/main';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { onMount } from 'svelte';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { loadRoomsData } from 'utilities/rooms';

    let element: HTMLInputElement;

    let errorMessage: string;
    let name: string;

    function createRoom(): void {
        if (!name) return;

        if (name.trim().length == 0) {
            return;
        }

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
        title: 'Create a room',
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
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="none" stroke="var(--branding)" stroke-width="1.5"
                ><path
                    d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2c1.108 0 2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715c.519.948.519 2.092.519 4.38v1.522c0 3.9 0 5.851-1.172 7.063C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212C2 19.576 2 17.626 2 13.725v-1.521Z"
                    opacity=".5"
                /><path stroke-linecap="round" d="M12 15v3" /></g
            ></svg
        >
        <input
            bind:this={element}
            class="modal-input"
            bind:value={name}
            maxlength={15}
        />
    </div>

    <InfoHeader
        marginLeft={'50px'}
        text={'You can invite your friends to this room later on'}
    />
</ModalTemplate>

<style>
    .friend-container {
        display: flex;
        align-items: center;
    }

    svg {
        width: 36px;
        height: 36px;
        margin-right: 5px;
        margin-bottom: 5px;
    }
</style>
