<script lang="ts">
    import { targetProfile } from 'stores/app/profile';
    import { showLayout } from 'stores/global';
    import { PanelTypes } from 'types/app/main';
    import { switchPanel } from 'utilities/app/main';

    // Force layout to be shown, if coming to this route directly
    $showLayout = true;
    $targetProfile = '';

    // Update panel
    switchPanel(PanelTypes.Profile);
</script>
