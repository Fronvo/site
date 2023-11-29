<script lang="ts">
    import { dismissModal, setTitle } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { socket } from 'stores/main';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        isInServer,
        currentRoomData as roomData,
    } from 'stores/rooms';
    import { loadRoomsData } from 'utilities/rooms';
    import { modalLoading, type ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { onMount } from 'svelte';

    let name: string;
    let input: HTMLInputElement;

    function isOwner(): boolean {
        return $roomData.ownerId == $ourData.profileId;
    }

    function leaveRoom(): void {
        if ($modalLoading || (isOwner() && name != $roomData.name)) return;

        $modalLoading = true;

        socket.emit(
            'leaveRoom',
            {
                roomId: $currentRoomId,
            },
            async ({ err }) => {
                if (!err) {
                    dismissModal();

                    $currentRoomLoaded = false;
                    $currentRoomId = undefined;
                    $currentRoomData = undefined;
                    $currentRoomMessages = [];
                    $isInServer = false;

                    setTitle('Fronvo');

                    await loadRoomsData();
                } else {
                    $modalLoading = false;
                }
            }
        );
    }

    onMount(() => {
        if (input) {
            input.focus();

            input.onkeyup = (ev) => {
                if (ev.key == 'Enter') {
                    leaveRoom();
                }
            };
        }
    });

    const data: ModalData = {
        title: `${isOwner() ? 'Delete' : 'Leave'} server`,
        actions: [
            {
                title: `${isOwner() ? 'Delete' : 'Leave'}`,
                callback: leaveRoom,
                danger: true,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if $roomData}
        <span class="placeholder">
            <h1>
                {Array.from($roomData.name)[0] || '?'}{Array.from(
                    $roomData.name
                )[1] || ''}
            </h1></span
        >

        {#if isOwner()}
            <input
                maxlength={15}
                bind:this={input}
                bind:value={name}
                class="modal-input"
                placeholder={`Type ${$roomData.name}`}
            />
        {/if}
    {/if}
</ModalTemplate>

<style>
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

    h1 {
        width: 75%;
        text-align: center;
        font-size: 1.2rem;
    }

    input {
        background: var(--bg);
        border-radius: 3px;
        border: 2px solid var(--bg);
        transition: 250ms;
    }

    input:focus {
        border: 2px solid red;
    }
</style>
