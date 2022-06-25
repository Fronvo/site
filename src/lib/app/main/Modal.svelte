<script lang="ts">
    import SettingsModal from '$lib/app/main/modals/SettingsModal.svelte';
    import {
        currentModal,
        modalAnimDuration,
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
        {#if $currentModal == 'Settings'}
            <SettingsModal />
        {/if}
    </div>
{/if}

<style>
    .modal-container {
        position: absolute;
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
        z-index: 1;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
