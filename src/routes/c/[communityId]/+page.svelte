<script lang="ts">
    import { showModal, switchPanel } from 'utilities/main';
    import { getKey } from 'utilities/global';
    import { loginSucceeded, showLayout } from 'stores/main';
    import { PanelTypes } from 'stores/panels';
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';

    $showLayout = true;
    let linkFired = false;

    if (!getKey('token')) {
        switchPanel(PanelTypes.Home);

        showModal(ModalTypes.JoinFronvo);
    }

    loginSucceeded.subscribe((state) => {
        if (!state || linkFired) return;

        if ($ourData?.isInCommunity) {
            switchPanel(PanelTypes.Community);

            linkFired = true;
        }
    });
</script>
