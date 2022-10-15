<script lang="ts">
    import type { DropdownActions } from 'types/main';
    import { dismissDropdown } from 'utilities/main';

    export let actions: DropdownActions[];

    function runCallback(callback: () => void): void {
        dismissDropdown();

        callback();
    }
</script>

<div class="dropdown-container">
    {#each actions as { title, callback, condition }}
        {#if typeof condition != 'undefined'}
            {#if condition}
                <button on:click={() => runCallback(callback)}>{title}</button>
            {/if}
        {:else}
            <button on:click={() => runCallback(callback)}>{title}</button>
        {/if}
    {/each}
</div>

<style>
    .dropdown-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .dropdown-container button {
        font-size: 1.4rem;
        margin-bottom: 10px;
        width: max-content;
    }

    .dropdown-container button:nth-last-child(1) {
        margin-bottom: 0;
    }

    @media screen and (max-width: 720px) {
        .dropdown-container button {
            font-size: 1.2rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .dropdown-container button {
            font-size: 1rem;
        }
    }
</style>
