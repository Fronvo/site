<script lang="ts">
    function createServer(): void {}
</script>

<div>
    <svg
        on:click={createServer}
        on:keydown={createServer}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ><g fill="none" stroke-width="1.5"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 7v7m0 0l3-3m-3 3l-3-3"
            /><path stroke-linecap="round" d="M16 17H8" /><path
                d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
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
        margin-top: 10px;
        background: var(--primary);
        border-radius: 20px;
        cursor: pointer;
        pointer-events: all;
        z-index: 2;
        transition: 125ms;
        margin-bottom: 10px;
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
</style>
