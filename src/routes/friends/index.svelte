<script lang="ts">
    import { switchPanel } from 'utilities/app/main';
    import { showLayout } from 'stores/global';

    // Force layout to be shown, if coming to this route directly
    $showLayout = true;

    // Update panel
    switchPanel('Friends');
</script>

<svelte:head>
    <title>Fronvo | Friends</title>
</svelte:head>
