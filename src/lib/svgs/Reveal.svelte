<script lang="ts">
    export let callback: () => void;
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={callback}
    ><style></style><path
        class="svg"
        d="m3.6 4.9l0.8 38.1h-3.6l-0.8-38zm2.2 19.1l8.9-9.3 2.6 2.5-4.6 4.9 23.2-0.5-4.8-4.6 2.5-2.7 9.3 8.9-8.9 9.3-2.7-2.5 4.7-4.8-23.2 0.5 4.8 4.6-2.5 2.6zm42-20l0.8 38-3.6 0.1-0.8-38.1z"
    /></svg
>

<style>
    svg {
        width: 40px;
        height: 40px;
        padding: 5px;
    }

    svg:hover {
        border-radius: 5px;
        background: var(--side_svg_bg_color);
    }

    svg:active {
        transform: scale(0.975);
    }
</style>
