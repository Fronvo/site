<script lang="ts">
    import { scale } from 'svelte/transition';

    export let errorMessage: string;
</script>

{#if errorMessage}
    <h1 in:scale={{ duration: 500, start: 0.925 }}>{errorMessage}</h1>
{/if}

<style>
    h1 {
        color: red;
        font-size: 1.8rem;
        margin: 0;
        width: 100%;
    }

    @media screen and (max-width: 700px) {
        h1 {
            font-size: 1.4rem;
        }
    }
</style>
