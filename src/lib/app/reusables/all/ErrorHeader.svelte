<script lang="ts">
    import { scale } from 'svelte/transition';

    export let errorMessage: string;
</script>

{#if errorMessage}
    <h1 in:scale={{ duration: 250, start: 0.925 }}>{errorMessage}</h1>
{/if}

<style>
    h1 {
        color: red;
        font-size: 1.6rem;
        margin: 0;
        width: 100%;
    }

    @media screen and (max-width: 850px) {
        h1 {
            font-size: 1.1rem;
        }
    }
</style>
