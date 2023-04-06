<script lang="ts">
    import { progressBarVisible } from 'stores/main';
    import { slide } from 'svelte/transition';
</script>

{#if $progressBarVisible}
    <div transition:slide={{ duration: 250 }} class="progress" />
{/if}

<style>
    .progress {
        position: fixed;
        padding: 5px;
        width: 100%;
        z-index: 100;
        background: linear-gradient(
            -45deg,
            var(--svg_stroke),
            var(--branding_color)
        );
        box-shadow: 0 0 10px var(--svg_stroke);
        background-size: 5000%;
        animation-name: gradient;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>
