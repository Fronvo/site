<script lang="ts">
    import { switchPanel } from 'src/utilities/app/main';
    import { showLayout } from 'stores/global';

    // Force layout to be shown, if coming to this route directly
    $showLayout = true;

    // Update panel
    switchPanel('Settings');
</script>

<svelte:head>
    <title>Fronvo | Settings</title>
</svelte:head>
