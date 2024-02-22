<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { quintInOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { showModal } from 'utilities/main';

    function pendingFriends(): void {
        showModal(ModalTypes.PendingFriends);
    }

    function addFriend(): void {
        showModal(ModalTypes.AddFriend);
    }
</script>

<div
    class="options-container"
    in:fly={{
        y: 0,
        duration: 400,
        easing: quintInOut,
        opacity: 0,
    }}
>
    {#if $ourData.pendingFriendRequests.length > 0}
        <button on:click={pendingFriends}
            >{$ourData.pendingFriendRequests.length} Pending</button
        >
    {/if}

    <button on:click={addFriend}>Add friend</button>
</div>

<style>
    .options-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 400px;
        margin-bottom: 25px;
    }

    button {
        width: 100%;
        max-width: 250px;
        font-size: 1rem;
        font-weight: 600;
        transition: 150ms;
        color: var(--text);
        margin-left: 10px;
        margin-right: 10px;
        background: rgb(125, 125, 125, 0.1);
    }

    button:hover {
        color: var(--text);
        background: rgb(125, 125, 125, 0.2);
    }
</style>
