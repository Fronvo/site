<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { showModal } from 'utilities/main';

    function joinServer(): void {
        showModal(ModalTypes.JoinServer);
    }
</script>

<div>
    <svg
        on:click={joinServer}
        on:keydown={joinServer}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ><path
            fill="none"
            stroke-linecap="round"
            stroke-width="1.5"
            d="M9 12h6m-6 6H8A6 6 0 0 1 8 6h1m6 0h1a6 6 0 0 1 0 12h-1"
        /></svg
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
        stroke: var(--text);
        margin-top: 10px;
    }

    svg:hover {
        background: var(--tertiary);
        stroke: var(--text);
        border-radius: 15px;
    }

    svg:active {
        transform: translateY(2px);
    }
</style>
