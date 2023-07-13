<script lang="ts">
    import LoadingDiamonds from '$lib/svgs/LoadingDiamonds.svelte';
    import { onMount } from 'svelte';

    let loadingText: HTMLHeadingElement;

    const intros = [
        'Welcome back.',
        'Glad to see you.',
        'Securing your data..',
        "Fronvo's birthday is on the 3rd of October!",
        'What a pleasure to have you back!',
        'Splashing the screen..',
        'Finding friends..',
        'Waking up the server..',
        'Setting up the lighting..',
    ];

    function choose(choices: string[]) {
        var index = Math.floor(Math.random() * choices.length);

        return choices[index];
    }

    onMount(() => {
        loadingText.textContent = choose(intros) as string;
    });
</script>

<div class="loading-container">
    <LoadingDiamonds />

    <h1 bind:this={loadingText} id="loading-text">Placeholder</h1>
</div>

<style>
    .loading-container {
        z-index: -1;
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        margin: auto;
        overflow: hidden;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .loading-container h1 {
        font-size: 1.6rem;
        margin-top: 50px;
    }
</style>
