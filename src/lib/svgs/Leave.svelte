<script lang="ts">
    export let callback = () => {};
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={callback}
    ><path
        class="svg"
        d="m34.2 33.5q-0.6-0.6-0.6-1.4 0-0.7 0.6-1.2l4.7-4.8h-19q-0.7 0-1.2-0.5-0.6-0.5-0.6-1.3 0-0.7 0.6-1.3 0.5-0.4 1.2-0.4h18.9l-4.8-4.8q-0.5-0.5-0.5-1.2 0-0.8 0.6-1.4 0.4-0.5 1.2-0.5 0.8 0 1.3 0.5l7.9 7.9q0.2 0.4 0.4 0.6 0.1 0.4 0.1 0.7 0 0.4-0.1 0.6-0.2 0.3-0.4 0.7l-7.9 7.8q-0.4 0.5-1.1 0.5-0.8 0-1.3-0.5zm-27.6 12.2q-1.5 0-2.5-1-1.1-1.1-1.1-2.6v-35.5q0-1.5 1-2.5 1.1-1.1 2.6-1.1h15.5q0.7 0 1.2 0.5 0.5 0.6 0.5 1.2 0 0.8-0.5 1.4-0.5 0.5-1.2 0.5h-15.5v35.5h15.5q0.7 0 1.2 0.5 0.5 0.6 0.5 1.4 0 0.7-0.5 1.2-0.5 0.5-1.2 0.5z"
    /></svg
>

<style>
    svg {
        width: 50px;
        height: 50px;
        padding: 10px;
        margin-right: 5px;
        margin-left: 5px;
        border-radius: 10px;
    }

    svg:hover {
        background: var(--side_svg_bg_color);
    }

    @media screen and (max-width: 850px) {
        svg {
            width: 34px;
            height: 34px;
            padding: 5px;
        }
    }
</style>
