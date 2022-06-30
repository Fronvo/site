<script lang="ts">
    import Avatar from '$lib/svgs/Avatar.svelte';
    import type { HomeUpdates } from 'interfaces/app/home';
    import { fade, fly } from 'svelte/transition';

    export let homeUpdates: HomeUpdates[] = undefined;
</script>

{#if homeUpdates}
    <div class="updates-container" in:fly={{ duration: 1000, y: 50 }}>
        {#each homeUpdates as { url }, i}
            <div in:fade={{ duration: 500, delay: (i + 1) * 80 }}>
                <Avatar {url} />
            </div>
        {/each}
    </div>
{/if}

<style>
    .updates-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 10%;
        height: max-content;
        margin: auto;
        background: var(--theme-nav_bg_color);
        backdrop-filter: blur(5px);
        box-shadow: 0 0 10px var(--theme-nav_shadow_color);
        transition: 300ms background;
        border-radius: 10px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        padding: 10px;
    }

    .updates-container div {
        display: flex;
        flex-direction: column;
    }

    /* 2nd avatar and onwards */
    .updates-container div:nth-child(n + 2) {
        margin-top: 10px;
    }

    @media screen and (max-width: 720px) {
        .updates-container {
            top: 0;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    }
</style>
