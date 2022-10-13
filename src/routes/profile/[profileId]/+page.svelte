<script lang="ts">
    import { page } from '$app/stores';
    import { targetProfile } from 'stores/profile';
    import { showLayout } from 'stores/all';
    import { PanelTypes } from 'types/main';
    import { switchPanel } from 'utilities/main';

    $targetProfile = $page.params.profileId;
    $showLayout = true;

    // Update panel
    switchPanel(PanelTypes.Profile);
</script>

<svelte:head>
    <title>Fronvo | {$page.params.profileId}</title>
</svelte:head>
