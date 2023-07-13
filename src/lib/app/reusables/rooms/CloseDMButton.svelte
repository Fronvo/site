<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { showModal } from 'utilities/main';

    function closeDM(): void {
        showModal(ModalTypes.CloseDM);
    }
</script>

<button on:click={closeDM}>
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
    >Close DM</button
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
        transform: translateY(-40px);
    }

    button:hover {
        background: var(--primary);
    }

    svg {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
</style>
