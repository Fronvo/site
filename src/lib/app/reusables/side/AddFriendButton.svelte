<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { showModal } from 'utilities/main';

    function addFriend(): void {
        showModal(ModalTypes.AddFriend);
    }
</script>

<button on:click={addFriend}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ><g fill="none" stroke="var(--branding)" stroke-width="1.5"
            ><circle cx="12" cy="12" r="10" opacity=".5" /><path
                stroke-linecap="round"
                d="M15 12h-3m0 0H9m3 0V9m0 3v3"
            /></g
        ></svg
    >Add friend</button
>

<style>
    button {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 1rem;
        box-shadow: none;
        border-radius: 0;
        background: transparent;
    }

    button:hover {
        background: var(--primary);
    }

    svg {
        width: 28px;
        height: 28px;
        margin-right: 10px;
    }
</style>
