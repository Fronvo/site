<script lang="ts">
    import { page } from '$app/stores';
    import { targetCommunity } from 'stores/communities';
    import { showLayout } from 'stores/all';
    import { PanelTypes } from 'types/main';
    import { switchPanel } from 'utilities/main';

    $targetCommunity = $page.params.communityId;
    $showLayout = true;

    // Update panel
    switchPanel(PanelTypes.Communities);
</script>
