<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { quintInOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { showModal } from 'utilities/main';

    function addFriend(): void {
        showModal(ModalTypes.AddFriend);
    }
</script>

<div
    class="options-container"
    in:fly={{
        y: 25,
        duration: 500,
        easing: quintInOut,
        opacity: 0,
    }}
>
    {#if $ourData.pendingFriendRequests.length > 0}
        <button>{$ourData.pendingFriendRequests.length} Pending</button>
    {/if}

    <button on:click={addFriend}>Add friend</button>
</div>

<style>
    .options-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 225px;
        border: 2px solid var(--branding);
        backdrop-filter: blur(10px);
        background: rgb(30, 30, 30, 0.3);
        border-radius: 20px;
        margin-top: 10px;
        margin-bottom: 30px;
        padding: 2px;
    }

    button {
        width: 100%;
        background: transparent;
        box-shadow: none;
        font-size: 1rem;
        font-weight: 600;
        transition: 150ms;
        border-radius: 15px;
    }
    button:hover {
        background: var(--branding);
    }
</style>
