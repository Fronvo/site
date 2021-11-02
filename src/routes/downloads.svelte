<svelte:head>
    <title>Fronvo - Downloads</title>
</svelte:head>

<script context='module'>
    export const prerender = true;
    export const hydrate = false;
    export const ssr = false;
</script>

<script>
import { onMount } from 'svelte';

    import { fade } from 'svelte/transition';
    import { animateFadeIn } from '../utilities';

    let main;

    function setupUI() {
        main = document.getElementById('downloadsMain');

        animateFadeIn(main);

        main.style.display = 'initial';
    }

    onMount(() => {
        setupUI();
    });
</script>

<div id='downloadsMain' out:fade={{delay: 200}} class='center'>
    <h1 in:fade={{delay: 200}}>Coming soon...</h1>
</div>
