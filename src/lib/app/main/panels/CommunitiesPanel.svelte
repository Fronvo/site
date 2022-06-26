<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { loadCommunitiesPanel } from 'utilities/app/communities';

    goto('communities', {
        replaceState: true,
    });

    $: loadCommunitiesPanel();
</script>

<div class="communities-container" in:fade={{ duration: 200, delay: 200 }}>
    <h1>Communities are coming soon!</h1>
</div>

<style>
    .communities-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        flex: 1;
    }

    .communities-container h1 {
        text-align: center;
        font-size: 2rem;
    }

    @media screen and (max-width: 720px) {
        .communities-container {
            margin: 0;
            margin-bottom: 100px;
        }

        .communities-container h1 {
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 520px) {
        .communities-container h1 {
            font-size: 1.5rem;
        }
    }
</style>
