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
        d="m43.8 29.6l-4.3-4.3 1.7-1.7q0.5-0.5 1.3-0.5 0.8 0 1.3 0.5l1.7 1.7q0.5 0.5 0.5 1.3 0 0.8-0.5 1.3zm-20 15.7v-4.3l13.1-13.1 4.3 4.3-13.1 13.1zm-21.7-16.4h18.1v3.6h-18.1zm0-9.9h28.4v3.6h-28.4zm0-10h28.4v3.6h-28.4z"
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
