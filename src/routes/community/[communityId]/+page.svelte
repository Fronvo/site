<script lang="ts">
    import { page } from '$app/stores';
    import { targetCommunity } from 'stores/app/communities';
    import { showLayout } from 'stores/global';
    import { PanelTypes } from 'types/app/main';
    import { switchPanel } from 'utilities/app/main';

    $targetCommunity = $page.params.communityId;
    $showLayout = true;

    // Update panel
    switchPanel(PanelTypes.Communities);
</script>
