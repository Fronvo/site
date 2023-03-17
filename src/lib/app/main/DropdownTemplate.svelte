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
    {#each actions as { title, callback, condition, useHr }}
        {#if typeof condition != 'undefined'}
            {#if condition}
                <button on:click={() => runCallback(callback)}>{title}</button>

                {#if useHr}
                    <hr />
                {/if}
            {/if}
        {:else}
            <button on:click={() => runCallback(callback)}>{title}</button>

            {#if useHr}
                <hr />
            {/if}
        {/if}
    {/each}
</div>

<style>
    hr {
        width: 30%;
        opacity: 25%;
        height: 1px;
        padding: 0;
        margin: 0;
        align-self: center;
    }

    .dropdown-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .dropdown-container button {
        font-size: 1.1rem;
        width: 100%;
        border: none;
        border-radius: none;
        box-shadow: none;
        background: transparent;
        transition: none;
        border-radius: 0;
    }

    .dropdown-container button:hover {
        color: var(--profile_info_color);
        background: var(--bg_color);
    }

    .dropdown-container button:active {
        transform: none;
    }

    @media screen and (max-width: 850px) {
        .dropdown-container button {
            font-size: 0.9rem;
        }
    }
</style>
