<script lang="ts">
    import { switchPanel } from 'utilities/main';
    import { PanelTypes } from 'stores/panels';
    import { showLayout } from 'stores/main';

    $showLayout = true;

    switchPanel(PanelTypes.Home);
</script>
