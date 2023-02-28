<script lang="ts">
    import {
        currentModalId,
        modalAnimDuration,
        modals,
        modalSide,
        modalVisible,
    } from 'stores/modals';
    import { fade } from 'svelte/transition';
</script>

{#if $modalVisible}
    <div
        class={`modal-container modal-side-${$modalSide}`}
        in:fade={{
            duration: modalAnimDuration * 0.5,
        }}
        out:fade={{
            duration: modalAnimDuration * 0.5,
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
        align-items: center;
        justify-content: center;
        z-index: 3;
        background: var(--modal_bg_color);
        overflow: hidden;
        overflow-x: hidden;
    }

    .modal-side-left {
        justify-content: left;
    }

    .modal-side-right {
        justify-content: right;
    }
</style>
