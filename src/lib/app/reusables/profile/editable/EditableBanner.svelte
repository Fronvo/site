<script lang="ts">
    export let updateCallback: () => void;
</script>

<span>
    <svg
        on:click={updateCallback}
        on:keydown={updateCallback}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><path
            fill-rule="evenodd"
            d="M15.493 6.935a.75.75 0 0 1 .072 1.058l-7.857 9a.75.75 0 0 1-1.13 0l-3.143-3.6a.75.75 0 0 1 1.13-.986l2.578 2.953l7.292-8.353a.75.75 0 0 1 1.058-.072Zm5.024.085c.3.285.312.76.026 1.06l-8.571 9a.75.75 0 0 1-1.14-.063l-.429-.563a.75.75 0 0 1 1.076-1.032l7.978-8.377a.75.75 0 0 1 1.06-.026Z"
            clip-rule="evenodd"
        /></svg
    >
</span>

<style>
    span {
        display: flex;
        align-items: start;
        justify-content: end;
        width: 100%;
        height: 100px;
        transition: 150ms;
    }

    svg {
        fill: var(--text);
        background: var(--primary);
        padding: 5px;
        border-radius: 20px;
        transition: 125ms;
        transform: translateX(-10px) translateY(10px);
    }

    svg:hover {
        background: var(--tertiary);
    }

    svg:active {
        transform: translateX(-10px) translateY(10px) scale(0.95);
    }
</style>
