<svelte:head>
    <title>Fronvo - Downloads</title>
</svelte:head>

<script context='module'>
	export const prerender = true;
	export const ssr = false;
</script>

<script>
    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';

    let mountReady = false;

    onMount(() => {
        mountReady = true;
    });

</script>

{#if mountReady}
    <div in:scale={{start: .9, delay: 150}} out:scale={{start: .9}} class='center'>
        <h1>Coming soon...</h1>
    </div>
{/if}
