<script lang="ts">
    import { scale } from 'svelte/transition';

    export let errorMessage: string;
    export let size: string = '1.6rem';
</script>

{#if errorMessage}
    <h1 style={`font-size: ${size}`} in:scale={{ duration: 250, start: 0.925 }}>
        {errorMessage}
    </h1>
{/if}

<style>
    h1 {
        color: red;
        margin: 0;
        width: 100%;
    }
</style>
