<script lang="ts">
    import {
        currentDropdownId,
        dropdownPosition,
        dropdowns,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { blur, fade, scale, slide } from 'svelte/transition';

    let element: HTMLDivElement;
    let unsubscribe: Unsubscriber;

    onMount(() => {
        unsubscribe = dropdownPosition.subscribe((newPosition) => {
            if ($dropdownVisible) return;

            element.style.opacity = '0';

            element.style.left = `${newPosition[0]}px`;
            element.style.top = `${newPosition[1]}px`;

            setTimeout(() => {
                // Calculate dropdown height along with top position, get bounds
                if (
                    element.clientHeight + $dropdownPosition[1] >
                    document.body.clientHeight - 64
                ) {
                    element.style.top = `${
                        document.body.clientHeight - 64 - element.clientHeight
                    }px`;
                }

                if ($dropdownPosition[1] < -30) {
                    element.style.top = '0px';
                }

                element.style.opacity = '1';
            }, 0);
        });
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div bind:this={element} class="dropdown-container">
    {#if $dropdownVisible}
        <div class="item-container">
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
        z-index: 4;
        border-radius: 10px;
    }

    .item-container {
        border-radius: 20px;
        overflow: hidden;
        padding: 5px;
    }
</style>
