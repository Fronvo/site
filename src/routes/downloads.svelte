<svelte:head>
    <title>Fronvo - Downloads</title>
</svelte:head>

<script context='module'>
    export const prerender = true;
    export const ssr = false;
</script>

<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { animateFadeIn } from '../utilities';

    let main;

    function setupUI() {
        main = document.getElementById('downloadsMain');

        animateFadeIn(main);
    }

    onMount(() => {
        setupUI();
    });
</script>

<div id='downloadsMain' in:fly={{y: -200}} out:fly={{y: 200}} class='center' style='display: none;'>
    <h1>Coming soon...</h1>
</div>
