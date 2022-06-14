<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';

    goto('friends', {
        replaceState: true,
    });
</script>

<div class="friends-container" in:fade={{ duration: 200, delay: 200 }}>
    <h1>Friends are coming soon!</h1>
</div>

<style>
    .friends-container {
        width: 100%;
    }

    .friends-container h1 {
        text-align: center;
        font-size: 2rem;
    }

    @media screen and (max-width: 520px) {
        .friends-container h1 {
            font-size: 1.7rem;
        }
    }
</style>
