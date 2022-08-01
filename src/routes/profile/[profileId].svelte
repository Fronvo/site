<script lang="ts">
    import { page } from '$app/stores';
    import { targetProfile } from 'stores/app/profile';
    import { showLayout } from 'stores/global';
    import { switchPanel } from 'utilities/app/main';

    $targetProfile = $page.params.profileId;
    $showLayout = true;

    // Update panel
    switchPanel('Profile');
</script>

<svelte:head>
    <title>Fronvo | {$page.params.profileId}</title>
</svelte:head>
