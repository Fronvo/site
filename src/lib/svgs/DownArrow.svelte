<script lang="ts">
    import { draw } from 'svelte/transition';

    export let width = '48px';
    export let height = '48px';
    export let drawDelay = 0;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    {width}
    {height}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width={2}
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather-icon"
    ><polyline in:draw={{ delay: drawDelay }} points="6 9 12 15 18 9" /></svg
>

<style>
    .feather-icon {
        color: rgb(153, 29, 255);
    }
</style>
