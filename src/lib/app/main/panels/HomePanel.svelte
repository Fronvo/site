<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<div class="home-container" transition:fade={{ duration: 750 }}>
    <h1>Fronvo is under construction!</h1>
</div>

<style>
    .home-container h1 {
        text-align: center;
        font-size: 2rem;
    }

    @media screen and (max-width: 520px) {
        .home-container h1 {
            font-size: 1.7rem;
        }
    }
</style>
