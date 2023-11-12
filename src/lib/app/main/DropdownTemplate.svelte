<script lang="ts">
    import type { DropdownActions } from 'stores/dropdowns';
    import { dismissDropdown } from 'utilities/main';

    export let actions: DropdownActions[];

    function runCallback(callback: () => void): void {
        dismissDropdown();

        callback();
    }
</script>

<div class="dropdown-container">
    {#each actions as { title, callback, condition, icon, justifyStart }}
        {#if typeof condition == 'undefined' || (typeof condition != 'undefined' && condition)}
            <button
                class={`${justifyStart ? 'start' : 'center'}`}
                on:click={() => runCallback(callback)}
            >
                {#if icon}
                    <svelte:component this={icon} />
                {/if}

                {title}</button
            >
        {/if}
    {/each}
</div>

<style>
    .dropdown-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        border-radius: 5px;
        overflow: hidden;
    }

    button {
        display: flex;
        align-items: center;
        font-size: 0.95rem;
        box-shadow: none;
        transition: none;
        padding: 8px;
        border-radius: 0;
    }

    .start {
        justify-content: start;
    }

    .center {
        justify-content: center;
    }

    button:hover {
        background: var(--branding_darken);
        color: white;
    }

    button:active {
        transform: none;
    }
</style>
