<script lang="ts">
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';

    let mountReady = false;

    onMount(() => {
        mountReady = true;
    });
</script>

{#if mountReady}
    <div class="main-container" in:slide={{ duration: 250 }}>
        <h1 id="gradient">Thank you for going PRO.</h1>

        <h1 id="gradient">You can now return to the app.</h1>
    </div>
{/if}

<style>
    .main-container {
        position: fixed;
        height: max-content;
        margin: auto;
        width: 100%;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        z-index: 0;
    }

    #gradient {
        font-size: 1.6rem;
        font-weight: 900;
        color: transparent;
        text-align: center;
        background: linear-gradient(
            90deg,
            var(--branding) 10.42%,
            #0e62ff 54.68%,
            var(--branding) 100%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
        margin-bottom: 10px;
    }
</style>
