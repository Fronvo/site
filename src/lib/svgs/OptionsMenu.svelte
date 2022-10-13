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
        fill-rule="evenodd"
        d="M4 36v-3h40v3Zm0-10.5v-3h40v3ZM4 15v-3h40v3Z"
    /></svg
>

<style>
    svg {
        transition: 250ms;
        border-radius: 10px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    svg:hover {
        background: var(--nav_bg_color);
    }

    @media screen and (max-width: 520px) {
        svg {
            width: 38px;
            height: 38px;
        }
    }
</style>
