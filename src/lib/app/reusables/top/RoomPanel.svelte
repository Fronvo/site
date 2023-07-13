<script>
    import DmMembers from '$lib/app/main/rooms/DMMembers.svelte';
    import RoomMembers from '$lib/app/main/rooms/RoomMembers.svelte';
    import { currentRoomData } from 'stores/rooms';
</script>

<div class="settings-container">
    {#if !$currentRoomData?.isDM}
        <RoomMembers />
    {:else}
        <DmMembers />
    {/if}
</div>

<style>
    .settings-container {
        position: fixed;
    }
</style>
