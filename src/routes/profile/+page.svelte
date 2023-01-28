<script lang="ts">
    import { targetProfile } from 'stores/profile';
    import { showLayout } from 'stores/all';
    import { ModalTypes, PanelTypes } from 'types/main';
    import { showModal, switchPanel } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import { goto } from '$app/navigation';

    // Force layout to be shown, if coming to this route directly
    $showLayout = true;
    $targetProfile = '';

    if (getKey('token')) {
        switchPanel(PanelTypes.Profile);
    } else {
        goto('/home', {
            replaceState: true,
        });

        showModal(ModalTypes.JoinFronvo);
    }
</script>
