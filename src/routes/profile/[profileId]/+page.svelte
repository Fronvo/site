<script lang="ts">
    import { page } from '$app/stores';
    import { targetProfile } from 'stores/profile';
    import { showLayout } from 'stores/all';
    import { ModalTypes, PanelTypes } from 'types/main';
    import { showModal, switchPanel } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import { goto } from '$app/navigation';

    $targetProfile = $page.params.profileId;
    $showLayout = true;

    if (getKey('token')) {
        switchPanel(PanelTypes.Profile);
    } else {
        goto('/home', {
            replaceState: true,
        });

        showModal(ModalTypes.JoinFronvo);
    }
</script>
