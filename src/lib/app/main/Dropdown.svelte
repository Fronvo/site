<script lang="ts">
    import {
        currentDropdownId,
        currentPanelId,
        dropdownPosition,
        dropdowns,
        dropdownVisible,
        modalAnimDuration,
    } from 'stores/app/main';
    import { onDestroy, onMount } from 'svelte';
    import { quadInOut } from 'svelte/easing';
    import type { Unsubscriber } from 'svelte/store';
    import { scale } from 'svelte/transition';
    import { dismissDropdown } from 'utilities/app/main';

    let dropdownElement: HTMLDivElement;
    let unsubscribe: Unsubscriber;
    let unsubscribe2: Unsubscriber;

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
    });

    onDestroy(() => {
        unsubscribe();
        unsubscribe2();
    });
</script>

<div class="dropdown-container">
    {#if $dropdownVisible}
        <div
            class="item-container"
            in:scale={{
                duration: modalAnimDuration,
                start: 0.96,
                easing: quadInOut,
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
        z-index: 1;
    }

    .item-container {
        background: rgb(255, 255, 255, 0.05);
        box-shadow: 0 0 3px var(--nav_shadow_color);
        border-radius: 10px;
        padding: 10px;
    }

    @media screen and (max-width: 720px) {
        .item-container {
            padding: 5px;
        }
    }
</style>
