<script lang="ts">
    import { showLayout } from 'stores/all';
    import { ModalTypes, PanelTypes } from 'types/main';
    import { showModal, switchPanel } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import { goto } from '$app/navigation';

    // Force layout to be shown, if coming to this route directly
    $showLayout = true;

    if (getKey('token')) {
        switchPanel(PanelTypes.Communities);
    } else {
        goto('/home', {
            replaceState: true,
        });

        showModal(ModalTypes.JoinFronvo);
    }
</script>
