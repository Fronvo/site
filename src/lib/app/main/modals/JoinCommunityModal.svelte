<script lang="ts">
    import { socket } from 'stores/all';
    import { fade } from 'svelte/transition';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    let inviteCode: string;
    let isJoining = false;
    let canJoin = true;
    let errorMessage: string;

    function joinCommunity(): void {
        if (!canJoin || isJoining) return;

        isJoining = true;

        setProgressBar(true);

        socket.emit(
            'joinCommunity',
            {
                communityId: inviteCode,
            },
            async ({ err }) => {
                if (err) {
                    errorMessage = err.msg;
                    isJoining = false;
                    setProgressBar(false);

                    return;
                }

                dismissModal();

                // Update community panel
                await loadCommunitiesPanel();
            }
        );
    }

    const data: ModalData = {
        title: 'Join Community',

        actions: [
            {
                title: 'Join',
                callback: joinCommunity,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],

        removeTransparency: true,
    };
</script>

<ModalTemplate {data}>
    {#if errorMessage}
        <h1 class="modal-error-header modal-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <h1 class="modal-header">Invite code</h1>
    <!-- svelte-ignore a11y-autofocus -->
    <input
        class="modal-input"
        autofocus
        bind:value={inviteCode}
        maxlength={15}
    />
</ModalTemplate>

<style>
</style>
