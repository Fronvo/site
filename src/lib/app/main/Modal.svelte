<script lang="ts">
    import {
        currentModalId,
        modalAnimDuration,
        modals,
        modalVisible,
    } from 'stores/main';
    import { quadInOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';
</script>

{#if $modalVisible}
    <div
        class="modal-container"
        transition:scale={{
            duration: modalAnimDuration,
            start: 0.96,
            easing: quadInOut,
        }}
    >
        <svelte:component this={modals[$currentModalId]} />
    </div>
{/if}

<style>
    .modal-container {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 250ms all;
        z-index: 3;
        background: var(--modal_bg_color);
    }
</style>
