<script lang="ts">
    import { fade } from 'svelte/transition';

    export let errorMessage: string;
    export let size: string = '1.6rem';
</script>

{#if errorMessage}
    <h1 style={`font-size: ${size}`} in:fade={{ duration: 250 }}>
        {errorMessage}
    </h1>
{/if}

<style>
    h1 {
        color: red;
        margin: 0;
        text-align: center;
        font-weight: 600;
        margin-bottom: 20px;
        font-size: 1rem;
    }
</style>
