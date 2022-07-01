<script lang="ts">
    import {
        currentModalId,
        modalAnimDuration,
        modals,
        modalVisible,
    } from 'stores/app/main';
    import { circInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
</script>

{#if $modalVisible}
    <div
        class="modal-container"
        transition:slide={{ duration: modalAnimDuration, easing: circInOut }}
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
        background: var(--theme-modal_bg_color);
        transition: 250ms all;
        z-index: 2;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        backdrop-filter: blur(2px);
    }

    @media screen and (max-width: 720px) {
        .modal-container {
            backdrop-filter: none;
        }
    }
</style>
