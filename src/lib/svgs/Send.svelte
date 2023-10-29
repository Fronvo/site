<script lang="ts">
    import { sineInOut } from 'svelte/easing';
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
    transition:slide={{ axis: 'x', duration: 250, easing: sineInOut }}
    ><g
        ><path
            fill="var(--branding)"
            d="M14.143 15.962a.5.5 0 0 1-.244.68l-9.402 4.193c-1.495.667-3.047-.814-2.306-2.202l3.152-5.904c.245-.459.245-1 0-1.458L2.191 5.367c-.74-1.388.81-2.87 2.306-2.202l3.525 1.572a2 2 0 0 1 .974.932l5.147 10.293Z"
        /><path
            fill="var(--branding)"
            d="M15.533 15.39a.5.5 0 0 0 .651.233l4.823-2.15c1.323-.59 1.323-2.355 0-2.945L12.109 6.56a.5.5 0 0 0-.651.68l4.075 8.15Z"
        /></g
    ></svg
>

<style>
    svg {
        width: 34px;
        height: 34px;
        padding: 5px;
        margin-right: 5px;
        border-radius: 15px;
        transition: 150ms;
    }

    svg:active {
        transform: scale(0.95);
    }
</style>
