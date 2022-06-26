<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { loadMarketplacePanel } from 'utilities/app/marketplace';

    goto('marketplace', {
        replaceState: true,
    });

    $: loadMarketplacePanel();
</script>

<div class="marketplace-container" in:fade={{ duration: 200, delay: 200 }}>
    <h1>Theme Marketplace is coming soon!</h1>
</div>

<style>
    .marketplace-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        flex: 1;
    }

    .marketplace-container h1 {
        text-align: center;
        font-size: 2rem;
    }

    @media screen and (max-width: 700px) {
        .marketplace-container {
            margin: 0;
            margin-bottom: 100px;
        }

        .marketplace-container h1 {
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 520px) {
        .marketplace-container h1 {
            font-size: 1.5rem;
        }
    }
</style>
