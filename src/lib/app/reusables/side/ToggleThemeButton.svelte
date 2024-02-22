<script lang="ts">
    import { darkTheme } from 'stores/main';
    import { setKey } from 'utilities/global';

    function toggleTheme(): void {
        $darkTheme = !$darkTheme;
        setKey('darkTheme', $darkTheme);
    }
</script>

<div>
    {#if $darkTheme}
        <svg
            on:click={toggleTheme}
            on:keydown={toggleTheme}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="white"
            ><path
                d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10Z"
            /></svg
        >
    {:else}<svg
            on:click={toggleTheme}
            on:keydown={toggleTheme}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="black"
            ><path d="M17 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0Z" /><path
                fill-rule="evenodd"
                d="M12 1.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75ZM3.669 3.716a.75.75 0 0 1 1.06-.047L6.95 5.7a.75.75 0 1 1-1.012 1.107L3.716 4.776a.75.75 0 0 1-.047-1.06Zm16.662 0a.75.75 0 0 1-.047 1.06l-2.222 2.031A.75.75 0 0 1 17.05 5.7l2.222-2.031a.75.75 0 0 1 1.06.047ZM1.25 12a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75Zm18 0a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75Zm-2.224 5.025a.75.75 0 0 1 1.06 0l2.222 2.223a.75.75 0 0 1-1.06 1.06l-2.223-2.222a.75.75 0 0 1 0-1.06Zm-10.051 0a.75.75 0 0 1 0 1.061l-2.223 2.222a.75.75 0 0 1-1.06-1.06l2.222-2.223a.75.75 0 0 1 1.06 0ZM12 19.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Z"
                clip-rule="evenodd"
            /></svg
        >
    {/if}
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
        margin-top: 10px;
    }

    svg:hover {
        background: var(--tertiary);
        border-radius: 15px;
    }

    svg:active {
        transform: translateY(2px);
    }
</style>
