<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { showModal } from 'utilities/main';

    function createGroup(): void {
        showModal(ModalTypes.CreateRoom);
    }
</script>

<div class="group-container" on:click={createGroup} on:keydown={createGroup}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ><g fill="none" stroke-width="1.5"
            ><circle cx="12" cy="12" r="10" /><path
                stroke-linecap="round"
                d="M15 12h-3m0 0H9m3 0V9m0 3v3"
            /></g
        ></svg
    >
    <h1>Create group</h1>
</div>

<style>
    .group-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        cursor: pointer;
        padding: 8px;
        overflow: hidden;
        width: 100%;
        border-bottom: 1px solid var(--primary);
    }

    svg {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 32px;
        height: 32px;
        margin-left: 2px;
        margin-right: 10px;
        stroke: var(--text);
    }

    div:hover {
        background: var(--primary);
    }

    div h1 {
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.05rem;
        color: var(--text);
    }
</style>
