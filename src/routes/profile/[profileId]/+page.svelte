<script lang="ts">
    import { page } from '$app/stores';
    import { targetProfile } from 'stores/app/profile';
    import { showLayout } from 'stores/global';
    import { PanelTypes } from 'types/app/main';
    import { switchPanel } from 'utilities/app/main';

    $targetProfile = $page.params.profileId;
    $showLayout = true;

    // Update panel
    switchPanel(PanelTypes.Profile);
</script>

<svelte:head>
    <title>Fronvo | {$page.params.profileId}</title>
</svelte:head>
