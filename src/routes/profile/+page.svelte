<script lang="ts">
    import { targetProfile } from 'stores/profile';
    import { showLayout } from 'stores/all';
    import { PanelTypes } from 'types/main';
    import { switchPanel } from 'utilities/main';

    // Force layout to be shown, if coming to this route directly
    $showLayout = true;
    $targetProfile = '';

    // Update panel
    switchPanel(PanelTypes.Profile);
</script>
