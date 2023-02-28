<script lang="ts">
    import { showLayout } from 'stores/main';
    import { PanelTypes } from 'stores/panels';
    import { switchPanel } from 'utilities/main';

    $showLayout = true;

    switchPanel(PanelTypes.Home);
</script>
