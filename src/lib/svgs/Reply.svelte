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
        d="M39 38v-8.7q0-2.7-1.9-4.6-1.9-1.9-4.6-1.9H11.7l7.7 7.7-2.1 2.1L6 21.3 17.3 10l2.1 2.1-7.7 7.7h20.8q3.9 0 6.7 2.775Q42 25.35 42 29.3V38Z"
    /></svg
>

<style>
    svg {
        width: 40px;
        height: 40px;
    }

    @media screen and (max-width: 700px) {
        svg {
            width: 36px;
            height: 36px;
        }
    }
</style>
