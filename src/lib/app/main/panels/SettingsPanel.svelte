<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';

    goto('settings', {
        replaceState: true,
    });
</script>

<div class="home-container" in:fade={{ duration: 200, delay: 200 }}>
    <h1>Settings are being implemented!</h1>
</div>

<style>
    .home-container {
        width: 100%;
    }

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
