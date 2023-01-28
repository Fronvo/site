<script lang="ts">
    import { page } from '$app/stores';
    import { targetCommunity } from 'stores/communities';
    import { showLayout } from 'stores/all';
    import { ModalTypes, PanelTypes } from 'types/main';
    import { showModal, switchPanel } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import { goto } from '$app/navigation';

    $targetCommunity = $page.params.communityId;
    $showLayout = true;

    // Update panel
    if (getKey('token')) {
        switchPanel(PanelTypes.Communities);
    } else {
        goto('/home', {
            replaceState: true,
        });

        showModal(ModalTypes.JoinFronvo);
    }
</script>
