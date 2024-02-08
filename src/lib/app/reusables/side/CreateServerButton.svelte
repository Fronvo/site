<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { serversList } from 'stores/rooms';
    import { showModal } from 'utilities/main';

    function createServer(): void {
        showModal(ModalTypes.CreateServer);
    }
</script>

<div>
    <svg
        on:click={createServer}
        on:keydown={createServer}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><path d="M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z" /></svg
    >
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: max-content;
    }

    svg {
        width: 48px;
        height: 48px;
        padding: 10px;
        background: var(--primary);
        border-radius: 20px;
        cursor: pointer;
        pointer-events: all;
        z-index: 2;
        transition: 125ms;
        stroke: white;
    }

    svg:hover {
        background: var(--tertiary);
        stroke: white;
        border-radius: 15px;
    }

    svg:active {
        transform: translateY(2px);
    }
</style>
