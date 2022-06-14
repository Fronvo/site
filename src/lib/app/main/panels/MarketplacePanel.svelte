<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';

    goto('marketplace', {
        replaceState: true,
    });
</script>

<div class="marketplace-container" in:fade={{ duration: 200, delay: 200 }}>
    <h1>Theme Marketplace is coming soon!</h1>
</div>

<style>
    .marketplace-container {
        width: 100%;
    }

    .marketplace-container h1 {
        text-align: center;
        font-size: 2rem;
    }

    @media screen and (max-width: 520px) {
        .marketplace-container h1 {
            font-size: 1.7rem;
        }
    }
</style>
