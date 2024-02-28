<script lang="ts">
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { type ModalData, modalLoading } from 'stores/modals';
    import { isMobile, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { tempCurrentServer } from 'stores/rooms';
    import { ourData } from 'stores/profile';

    let element: HTMLInputElement;

    let errorMessage: string;
    let name = '';

    function leaveServer(): void {
        if ($modalLoading) return;

        if ($tempCurrentServer.ownerId == $ourData.profileId) {
            if (!name) return;

            if (name.trim().length == 0) return;

            if (name != $tempCurrentServer.name) return;

            $modalLoading = true;

            socket.emit(
                'deleteServer',
                { serverId: $tempCurrentServer.serverId },
                async ({ err }) => {
                    if (err) {
                        errorMessage = err.msg;

                        $modalLoading = false;
                    } else {
                        dismissModal();
                    }
                }
            );
        } else {
            $modalLoading = true;

            socket.emit(
                'leaveServer',
                { serverId: $tempCurrentServer.serverId },
                async ({ err }) => {
                    if (err) {
                        errorMessage = err.msg;

                        $modalLoading = false;
                    } else {
                        dismissModal();
                    }
                }
            );
        }
    }

    onMount(() => {
        if (!element) return;

        element.focus();

        element.onkeyup = (ev) => {
            if (ev.key == 'Enter') {
                leaveServer();
            }
        };
    });

    const data: ModalData = {
        title: `${
            $tempCurrentServer.ownerId == $ourData.profileId
                ? 'Delete'
                : 'Leave'
        } ${$tempCurrentServer.name}`,
        actions: [
            {
                title:
                    $tempCurrentServer.ownerId == $ourData.profileId
                        ? 'Delete'
                        : 'Leave',
                callback: leaveServer,
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

    <div class={`leave-container ${$isMobile ? 'mobile' : ''}`}>
        <span class="placeholder">
            <h1>
                {Array.from($tempCurrentServer.name)[0] || '?'}{Array.from(
                    $tempCurrentServer.name
                )[1] || ''}
            </h1></span
        >

        {#if $tempCurrentServer.ownerId == $ourData.profileId}
            <input
                bind:this={element}
                class="modal-input"
                bind:value={name}
                maxlength={15}
                placeholder={`Type ${$tempCurrentServer.name}`}
            />
        {/if}
    </div>
</ModalTemplate>

<style>
    .leave-container {
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

    @media screen and (max-width: 850px) {
        .mobile .placeholder {
            width: 80px;
            height: 80px;
        }

        .mobile .placeholder h1 {
            font-size: 1.1rem;
        }

        .mobile input {
            font-size: 1rem;
            width: 70vw;
        }
    }
</style>
