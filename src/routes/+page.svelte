<script lang="ts">
    import { indexVisible } from 'stores/index';
    import { onMount } from 'svelte';
    import { showLayout } from 'stores/main';
    import IndexMain from '$lib/index/IndexMain.svelte';

    let mountReady = false;

    onMount(async () => {
        // Disable __layout in index
        $showLayout = false;

        // Default when accessed
        $indexVisible = true;

        // Show the index page
        mountReady = true;
    });
</script>

{#if mountReady && $indexVisible}
    <div
        class="w-full h-screen flex flex-col overflow-y-scroll overflow-h-hidden"
    >
        {#if $indexVisible}
            <IndexMain />
        {/if}
    </div>
{/if}
