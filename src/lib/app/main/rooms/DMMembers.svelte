<script lang="ts">
    import { currentRoomData, dmsShowProfile } from 'stores/rooms';
    import DmMutuals from './DMMutuals.svelte';
    import PreviewSmall from '$lib/app/reusables/all/PreviewSmall.svelte';
</script>

{#if $currentRoomData?.dmUser && $dmsShowProfile}
    <div class="members-container">
        <PreviewSmall profileData={$currentRoomData?.dmUser} />

        <DmMutuals />
    </div>
{/if}

<style>
    .members-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 275px;
        z-index: 2;
        overflow: auto;
        height: calc(100vh - 65px);
        overflow: hidden;
    }
</style>
