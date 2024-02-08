<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { type ModalData, modalLoading } from 'stores/modals';
    import { socket } from 'stores/main';
    import { onMount } from 'svelte';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { currentServer } from 'stores/rooms';

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
            'createChannel',
            { serverId: $currentServer.serverId, name: name ? name : '' },
            async ({ err }) => {
                if (err) {
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
                createServer();
            }
        };
    });

    const data: ModalData = {
        title: 'Create channel',
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

    <div class="single">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path
                fill-rule="evenodd"
                d="M10.723 3.2a.75.75 0 1 0-1.446-.4L7.763 8.25H4a.75.75 0 1 0 0 1.5h3.347l-1.528 5.5H2a.75.75 0 0 0 0 1.5h3.402L4.277 20.8a.75.75 0 0 0 1.446.4l1.236-4.45h7.443l-1.125 4.05a.75.75 0 0 0 1.446.4l1.236-4.45H20a.75.75 0 1 0 0-1.5h-3.624l1.527-5.5H22a.75.75 0 0 0 0-1.5h-3.68l1.403-5.05a.75.75 0 1 0-1.446-.4l-1.514 5.45H9.32l1.403-5.05Zm4.096 12.05l1.528-5.5H8.903l-1.527 5.5h7.443Z"
                clip-rule="evenodd"
            /></svg
        >

        <input
            bind:this={element}
            class="modal-input"
            bind:value={name}
            maxlength={20}
        />
    </div>
</ModalTemplate>

<style>
    .single {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
    }

    svg {
        width: 28px;
        height: 28px;
        fill: var(--gray);
        margin-bottom: 10px;
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
