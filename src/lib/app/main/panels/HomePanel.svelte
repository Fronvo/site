<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';

    goto('home', {
        replaceState: true,
    });
</script>

<div class="home-container" in:fade={{ duration: 200, delay: 200 }}>
    <h1>Fronvo is under construction!</h1>
</div>

<style>
    .home-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        flex: 1;
    }

    .home-container h1 {
        text-align: center;
        font-size: 2rem;
    }

    @media screen and (max-width: 700px) {
        .home-container {
            margin: 0;
            margin-bottom: 100px;
        }

        .home-container h1 {
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 520px) {
        .home-container h1 {
            font-size: 1.5rem;
        }
    }
</style>
