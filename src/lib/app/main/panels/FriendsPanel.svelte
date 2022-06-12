<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<div
    class="friends-container"
    in:fade={{ duration: 200, delay: 300 }}
    out:fade={{ duration: 100 }}
>
    <h1>Coming soon!</h1>
</div>

<style>
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
