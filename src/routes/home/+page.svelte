<script lang="ts">
    import { goto } from '$app/navigation';
    import { showLayout } from 'stores/all';
    import { PanelTypes } from 'types/main';
    import { setTitle, switchPanel } from 'utilities/main';

    // Force layout to be shown, if coming to this route directly
    $showLayout = true;

    // Update panel
    switchPanel(PanelTypes.Home);

    goto('/home', {
        replaceState: true,
    });

    setTitle('Home - Fronvo');
</script>
