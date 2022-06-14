<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';

    goto('communities', {
        replaceState: true,
    });
</script>

<div class="communities-container" in:fade={{ duration: 200, delay: 200 }}>
    <h1>Communities are coming soon!</h1>
</div>

<style>
    .communities-container {
        width: 100%;
    }

    .communities-container h1 {
        text-align: center;
        font-size: 2rem;
    }

    @media screen and (max-width: 520px) {
        .communities-container h1 {
            font-size: 1.7rem;
        }
    }
</style>
