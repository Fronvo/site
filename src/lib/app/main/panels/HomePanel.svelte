<script lang="ts">
    import { goto } from '$app/navigation';
    import HomeUpdates from '$lib/app/main/panels/home/HomeUpdates.svelte';
    import { homeUpdates } from 'stores/app/home';
    import { loadHomePanel } from 'utilities/app/home';

    goto('home', {
        replaceState: true,
    });

    $: loadHomePanel();
</script>

<!-- Placeholder for hot updates -->
<div class="home-container">
    {#if $homeUpdates}
        <!-- TODO: Fill in homeUpdates -->
        <HomeUpdates />
    {/if}
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    @media screen and (max-width: 720px) {
        .home-container {
            margin-right: 0;
            margin-bottom: 9vh;
            margin-top: 0;
        }
    }

    @media screen and (max-width: 520px) {
    }
</style>
