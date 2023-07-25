<script lang="ts">
    import { slide } from 'svelte/transition';

    export let callback: () => void;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    on:click={callback}
    on:keydown={callback}
    transition:slide={{ axis: 'x', duration: 250 }}
    ><path
        fill="var(--branding)"
        fill-rule="evenodd"
        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
        clip-rule="evenodd"
    /></svg
>

<style>
    svg {
        width: 34px;
        height: 34px;
        padding: 5px;
        margin-right: 5px;
        margin-left: 5px;
        margin-bottom: 3px;
        border-radius: 30px;
    }

    svg:hover {
        transform: scale(0.95);
    }

    svg:active {
        transform: scale(0.9);
    }
</style>
