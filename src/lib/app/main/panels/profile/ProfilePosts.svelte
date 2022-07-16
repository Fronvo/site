<script lang="ts">
    import type { FronvoAccount } from 'interfaces/app/main';
    import { fade } from 'svelte/transition';

    export let info: FronvoAccount;
</script>

{#if info}
    <div class="posts-container">
        <!-- TODO: Each, check number of posts -->
        <h1 in:fade={{ duration: 500, delay: 1000 }} id="empty-text">
            No posts, yet
        </h1>
    </div>
{/if}

<style>
    .posts-container {
        /* TODO */
    }

    .posts-container #empty-text {
        margin: 0;
        font-size: 2.2rem;
    }

    @media screen and (max-width: 720px) {
        .posts-container #empty-text {
            font-size: 2rem;
        }
    }

    @media screen and (max-width: 520px) {
        .posts-container #empty-text {
            font-size: 1.7rem;
        }
    }
</style>
