<script lang="ts">
    import { showLayout } from 'stores/global';
    import { switchPanel } from 'utilities/app/main';

    // Force layout to be shown, if coming to this route directly
    $showLayout = true;

    // Update panel
    switchPanel('Home');
</script>

<svelte:head>
    <title>Fronvo | Home</title>
</svelte:head>
