<script lang="ts">
    import { showLayout } from 'stores/all';
    import { PanelTypes } from 'types/main';
    import { switchPanel } from 'utilities/main';

    // Force layout to be shown, if coming to this route directly
    $showLayout = true;

    // Update panel
    switchPanel(PanelTypes.Home);
</script>
