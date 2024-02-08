<script lang="ts">
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import { page } from '$app/stores';

    let loading: HTMLHeadingElement;

    const intros = [
        'Hello there, lost traveller.',
        'Looking for something?',
        "This ain't it!",
        'Sorry for that...',
        'How did you end up here!?',
        'Going back to base.',
    ];

    function choose(choices: string[]) {
        var index = Math.floor(Math.random() * choices.length);

        return choices[index];
    }

    function goRoot(): void {
        location.href = '/';
    }

    onMount(() => {
        loading.textContent = choose(intros) as string;
    });
</script>

<div class="error-container">
    <h1 on:click={goRoot} on:keydown={goRoot} in:slide id="status-code">
        {$page.status}
    </h1>

    <h1 id="error-text" bind:this={loading} in:slide={{ delay: 200 }}>
        Placeholder
    </h1>
</div>

<style>
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        margin: auto;
        height: fit-content;
        top: 0;
        bottom: 100px;
        left: 0;
        right: 0;
        text-align: center;
    }

    .error-container h1 {
        margin: 0;
    }

    .error-container #status-code {
        color: white;
        font-size: 7rem;
        margin-bottom: 10px;
        cursor: pointer;
        width: max-content;
    }

    .error-container #error-text {
        font-size: 2rem;
    }

    @media screen and (max-width: 800px) {
        .error-container #status-code {
            font-size: 5.5rem;
            cursor: default;
        }

        .error-container #error-text {
            font-size: 1.5rem;
        }
    }
</style>
