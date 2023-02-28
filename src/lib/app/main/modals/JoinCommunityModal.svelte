<script lang="ts">
    import { fade } from 'svelte/transition';
    import { dismissModal, setProgressBar, switchPanel } from 'utilities/main';
    import { loadCommunitiesData } from 'utilities/communities';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { cachedAccountData, socket } from 'stores/main';
    import type { ModalData } from 'stores/modals';
    import { loadOurProfile } from 'utilities/profile';
    import { PanelTypes } from 'stores/panels';

    let inviteCode: string;
    let isJoining = false;
    let canJoin = true;
    let errorMessage: string;

    function joinCommunity(): void {
        if (!canJoin || isJoining || !inviteCode) return;

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
                // Update community panel
                await loadCommunitiesData(
                    await loadOurProfile($cachedAccountData)
                );

                switchPanel(PanelTypes.Community);

                dismissModal();
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
