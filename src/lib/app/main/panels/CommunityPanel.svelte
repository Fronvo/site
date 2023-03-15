<script lang="ts">
    import { goto } from '$app/navigation';
    import { communityData } from 'stores/community';
    import { onMount } from 'svelte';
    import CommunityMain from './community/CommunityMain.svelte';

    onMount(() => {
        goto(`/c/${$communityData?.communityId}`, {
            replaceState: true,
        });
    });
</script>

<CommunityMain />
