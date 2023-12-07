<script lang="ts">
    import {
        currentModalId,
        modalAnimDuration,
        modals,
        modalVisible,
    } from 'stores/modals';
    import { fade } from 'svelte/transition';
    import { dismissModal } from 'utilities/main';

    let container: HTMLDivElement;

    function clickListener(ev: MouseEvent | KeyboardEvent): void {
        if (ev.target) {
            if (ev.target == container) dismissModal();
        }
    }
</script>

{#if $modalVisible}
    <div
        bind:this={container}
        class="modal-container"
        in:fade={{
            duration: modalAnimDuration * 0.5,
        }}
        out:fade={{
            duration: modalAnimDuration * 0.5,
        }}
        on:click={clickListener}
        on:keydown={clickListener}
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
        background: var(--modal_bg);
        overflow: hidden;
        overflow-x: hidden;
    }
</style>
