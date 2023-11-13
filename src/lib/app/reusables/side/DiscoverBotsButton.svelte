<script lang="ts">
    function discoverBots(): void {}
</script>

<div>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        on:click={discoverBots}
        on:keydown={discoverBots}
        stroke="currentColor"
        ><g fill="none" stroke-width="1.5"
            ><path
                stroke-linecap="round"
                d="m15.5 9l.172.172c1.333 1.333 2 2 2 2.828c0 .828-.667 1.495-2 2.828L15.5 15m-2.206-7.83L12 12l-1.294 4.83M8.5 9l-.171.172c-1.334 1.333-2 2-2 2.828c0 .828.666 1.495 2 2.828L8.5 15"
            /><path
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
        background: var(--secondary);
        border-radius: 20px;
        cursor: pointer;
        pointer-events: all;
        z-index: 2;
        transition: 125ms;
        stroke: rgb(72, 202, 113);
    }

    svg:hover {
        background: rgb(72, 202, 113);
        stroke: white;
        border-radius: 15px;
    }

    svg:active {
        transform: translateY(2px);
    }
</style>
