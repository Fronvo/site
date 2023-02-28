<script lang="ts">
    import { goto } from '$app/navigation';
    import { communityData } from 'stores/community';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import CommunityMain from './community/CommunityMain.svelte';

    onMount(() => {
        goto(`/c/${$communityData?.communityId}`, {
            replaceState: true,
        });
    });
</script>

<div class="communities-container" in:fade={{ duration: 250 }}>
    <CommunityMain />
</div>

<style>
    .communities-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        margin-bottom: 60px;
    }

    @media screen and (max-width: 700px) {
        .communities-container {
            margin-bottom: 100px;
        }
    }
</style>
