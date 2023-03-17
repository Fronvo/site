<script lang="ts">
    import { dismissModal, setProgressBar, switchPanel } from 'utilities/main';
    import { ourData } from 'stores/profile';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { cachedAccountData, socket } from 'stores/main';
    import { communityData } from 'stores/community';
    import { loadCommunitiesData } from 'utilities/communities';
    import { loadOurProfile } from 'utilities/profile';
    import type { ModalData } from 'stores/modals';
    import { PanelTypes } from 'stores/panels';
    import Checkbox from 'svelte-checkbox';

    let isLeaving = false;
    let consent = false;

    function isOwner(): boolean {
        return $communityData.ownerId == $ourData.profileId;
    }

    function leaveCommunity(): void {
        if (isLeaving || (isOwner() && !consent)) return;

        isLeaving = true;
        setProgressBar(true);

        socket.emit('leaveCommunity', ({ err }) => {
            if (!err) {
                dismissModal(async () => {
                    $communityData = undefined;

                    switchPanel(PanelTypes.Home);

                    await loadCommunitiesData(
                        await loadOurProfile($cachedAccountData)
                    );
                });
            } else {
                isLeaving = false;
                setProgressBar(false);
            }
        });
    }

    const data: ModalData = {
        title: `${isOwner() ? 'Delete' : 'Leave'} Community`,

        actions: [
            {
                title: `Yes, ${isOwner() ? 'delete' : 'leave'}`,
                callback: leaveCommunity,
                danger: true,
            },
            {
                title: `No, ${isOwner() ? 'keep' : 'stay'}`,
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if $communityData}
        {#if !isOwner()}
            <h1 class="modal-header">
                {isOwner() ? 'Delete' : 'Leave'} the
                <span>{$communityData?.name}</span> community?
            </h1>
        {:else}
            <div class="modal-center-no-overflow">
                <h1 class="modal-header">
                    I consent to the deletion of this community
                </h1>
                <Checkbox
                    bind:checked={consent}
                    class="checkbox"
                    size="2.4rem"
                    primaryColor="var(--modal_checkbox_primary_color)"
                    secondaryColor="var(--modal_checkbox_secondary_color)"
                />
            </div>
        {/if}
    {/if}
</ModalTemplate>
