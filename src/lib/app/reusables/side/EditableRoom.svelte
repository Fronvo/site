<script lang="ts">
    import { socket } from 'stores/main';
    import { ModalTypes } from 'stores/modals';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        currentRoomMessages,
        showEditableRoom,
    } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { toast } from 'svelte-sonner';
    import { setProgressBar, setTitle, showModal } from 'utilities/main';
    import { loadRoomsData } from 'utilities/rooms';

    let name: string;
    let input: HTMLInputElement;
    let isCreating = false;
    let cancelled = false;

    function createRoom(): void {
        if (isCreating || cancelled) return;

        if (!name) {
            $showEditableRoom = false;
            return;
        }

        if (name.length == 0) {
            $showEditableRoom = false;
            return;
        }

        isCreating = true;
        setProgressBar(true);

        input.disabled = true;

        socket.emit(
            'createRoom',
            {
                name,
            },
            ({ err }) => {
                if (err) {
                    showModal(ModalTypes.MaxRooms);
                    $showEditableRoom = false;
                } else {
                    toast(`Created ${name}`);
                }

                setProgressBar(false);
            }
        );
    }

    onMount(() => {
        if (!input) return;

        setTimeout(() => {
            input.focus();
        }, 0);

        input.onblur = () => {
            createRoom();
        };

        input.onkeyup = (ev) => {
            if (ev.key == 'Enter') {
                createRoom();
            } else if (ev.key == 'Escape') {
                cancelled = true;
                $showEditableRoom = false;
            }
        };

        socket.on('roomCreated', async () => {
            $currentRoomLoaded = false;
            $currentRoomId = undefined;
            $currentRoomData = undefined;
            $currentRoomMessages = [];

            setTitle('Fronvo');

            await loadRoomsData();

            $showEditableRoom = false;
        });
    });
</script>

<div class="dm-container">
    <svg
        id="avatar"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ><g fill="var(--branding)"
            ><path
                d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2c1.108 0 2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715c.519.948.519 2.092.519 4.38v1.522c0 3.9 0 5.851-1.172 7.063C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212C2 19.576 2 17.626 2 13.725v-1.521Z"
                opacity=".5"
            /><path
                d="M11.25 18a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0v3Z"
            /></g
        ></svg
    >

    <div class="info-container">
        <input bind:this={input} id="name" bind:value={name} maxlength={15} />
    </div>
</div>

<style>
    .dm-container {
        display: flex;
        align-items: center;
        padding: 10px 5px 10px 10px;
        transition: 75ms;
        cursor: default;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .info-container {
        margin-left: 6px;
        flex: 1;
    }

    #name {
        font-size: 1rem;
        margin: 0;
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        background: var(--primary);
        width: 175px;
    }

    #avatar {
        width: 44px;
        height: 44px;
        border-radius: 30px;
        cursor: default;
    }
</style>
