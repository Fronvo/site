<script lang="ts">
    import { dismissModal, setProgressBar, setTitle } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { socket } from 'stores/main';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        currentRoomData as roomData,
    } from 'stores/rooms';
    import { loadRoomsData } from 'utilities/rooms';
    import type { ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { onMount } from 'svelte';
    import { toast } from 'svelte-sonner';

    let isLeaving = false;
    let name: string;
    let input: HTMLInputElement;

    function isOwner(): boolean {
        return $roomData.ownerId == $ourData.profileId;
    }

    function leaveRoom(): void {
        if (isLeaving || (isOwner() && name != $roomData.name)) return;

        isLeaving = true;
        setProgressBar(true);

        socket.emit(
            'leaveRoom',
            {
                roomId: $currentRoomId,
            },
            async ({ err }) => {
                if (!err) {
                    dismissModal();
                    toast(
                        isOwner()
                            ? `Deleted ${$currentRoomData.name}`
                            : `Left ${$currentRoomData.name}`
                    );

                    $currentRoomLoaded = false;
                    $currentRoomId = undefined;
                    $currentRoomData = undefined;
                    $currentRoomMessages = [];

                    setTitle('Fronvo');

                    await loadRoomsData();
                } else {
                    isLeaving = false;
                    setProgressBar(false);
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
        title: `${isOwner() ? 'Delete' : 'Leave'} room`,
        actions: [
            {
                title: `${isOwner() ? 'Delete' : 'Leave'}`,
                callback: leaveRoom,
                danger: true,
            },
            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if $roomData}
        {#if !isOwner()}
            <h1 class="modal-header">
                Leave the
                <span>{$roomData?.name}</span> room?
            </h1>

            <InfoHeader
                marginLeft={'55px'}
                text={'You can be added to this room later.'}
            />
        {:else}
            <h1 class="modal-header">
                Type <b>{$roomData.name}</b> below to confirm
            </h1>
            <input bind:this={input} bind:value={name} class="modal-input" />
            <InfoHeader marginLeft={'55px'} text={"This can't be reversed."} />
        {/if}
    {/if}
</ModalTemplate>

<style>
    h1 {
        width: 75%;
        text-align: start;
        font-size: 1.2rem;
        margin-bottom: 5px;
    }

    h1 b {
        letter-spacing: 1px;
        font-size: 1.1rem;
    }
</style>
