<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { currentRoomData } from 'stores/rooms';
    import { showModal } from 'utilities/main';

    function leaveServer(): void {
        showModal(ModalTypes.LeaveRoom);
    }
</script>

<button on:click={leaveServer}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ><path
            fill="none"
            stroke="red"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M20 12H4m0 0l6-6m-6 6l6 6"
        /></svg
    >{$currentRoomData?.ownerId == $ourData.profileId ? 'Delete' : 'Leave'} server</button
>

<style>
    button {
        width: 95%;
        display: flex;
        align-items: center;
        font-size: 1rem;
        box-shadow: none;
        border-radius: 10px;
        background: transparent;
        transition: 150ms;
    }

    button:hover {
        background: var(--secondary);
    }

    svg {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
</style>
