<script lang="ts">
    import {
        currentModalId,
        modalAnimDuration,
        modals,
        modalVisible,
    } from 'stores/main';
    import { backOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';
</script>

{#if $modalVisible}
    <div
        class="modal-container"
        transition:scale={{
            duration: modalAnimDuration,
            start: 1.05,
            easing: backOut,
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
        overflow: auto;
    }
</style>
