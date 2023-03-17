<script lang="ts">
    import {
        currentDropdownId,
        dropdownAnimDuration,
        dropdownPosition,
        dropdowns,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { modalVisible } from 'stores/modals';
    import { currentPanelId } from 'stores/panels';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { slide } from 'svelte/transition';
    import { dismissDropdown } from 'utilities/main';

    let dropdownElement: HTMLDivElement;
    let unsubscribe: Unsubscriber;
    let unsubscribe2: Unsubscriber;
    let unsubscribe3: Unsubscriber;

    onMount(() => {
        unsubscribe = dropdownPosition.subscribe((newPosition) => {
            if ($dropdownVisible) return;

            dropdownElement = document.getElementsByClassName(
                'dropdown-container'
            )[0] as HTMLDivElement;
            dropdownElement.style.left = `${newPosition[0] + 10}px`;
            dropdownElement.style.top = `${newPosition[1] + 5}px`;
        });

        unsubscribe2 = currentPanelId.subscribe(() => {
            dismissDropdown();
        });

        unsubscribe3 = modalVisible.subscribe(() => {
            dismissDropdown();
        });
    });

    onDestroy(() => {
        unsubscribe();
        unsubscribe2();
        unsubscribe3();
    });
</script>

<div class="dropdown-container">
    {#if $dropdownVisible}
        <div
            class="item-container"
            in:slide={{
                duration: dropdownAnimDuration,
            }}
        >
            <svelte:component this={dropdowns[$currentDropdownId]} />
        </div>
    {/if}
</div>

<style>
    .dropdown-container {
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        z-index: 3;
    }

    .item-container {
        background: var(--button_background);
        box-shadow: 0 0 2px var(--accent_shadow_color);
        border-radius: 5px;
        overflow: hidden;
    }
</style>
