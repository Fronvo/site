<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { serversList } from 'stores/rooms';
    import { showModal } from 'utilities/main';

    function createServer(): void {
        showModal(ModalTypes.CreateServer);
    }
</script>

<div>
    {#if $serversList.length > 0}
        <span class="seperator" />
    {/if}

    <svg
        on:click={createServer}
        on:keydown={createServer}
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
        stroke: var(--branding);
    }

    svg:hover {
        background: var(--branding);
        stroke: white;
        border-radius: 15px;
    }

    svg:active {
        transform: translateY(2px);
    }

    .seperator {
        width: 75%;
        margin: auto;
        height: 2px;
        background: var(--tertiary);
        margin-bottom: 10px;
    }
</style>
