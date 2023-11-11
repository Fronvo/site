<script lang="ts">
    import { ModalTypes } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { themes } from 'stores/themes';
    import { showModal } from 'utilities/main';
    import ThemeView from '../themes/ThemeView.svelte';
</script>

<div class="marketplace-container">
    {#if !$ourData.isPRO}
        <div class="empty">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><g fill="none" stroke="var(--pro)" stroke-width="1.5"
                    ><path
                        d="M2 6c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 2 4.6 2 6 2c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.093 1.093C10 3.9 10 4.6 10 6v12c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.092C8.1 22 7.4 22 6 22c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2 20.1 2 19.4 2 18V6Z"
                    /><path
                        stroke-linecap="round"
                        d="M7 19H5"
                        opacity=".5"
                    /><path
                        d="m13.314 4.929l-2.142 2.142c-.579.578-.867.867-1.02 1.235C10 8.673 10 9.082 10 9.9v9.656l8.97-8.97c.99-.99 1.486-1.485 1.671-2.056a2.5 2.5 0 0 0 0-1.545c-.185-.57-.68-1.066-1.67-2.056c-.99-.99-1.486-1.485-2.056-1.67a2.5 2.5 0 0 0-1.545 0c-.571.185-1.066.68-2.056 1.67Z"
                    /><path
                        d="M6 22h12c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092C22 20.1 22 19.4 22 18c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.092C20.1 14 19.4 14 18 14h-2.5"
                        opacity=".5"
                    /></g
                ></svg
            >

            <h1>Theme Marketplace</h1>

            <button id="pro-btn" on:click={() => showModal(ModalTypes.GoPRO)}
                >Go PRO</button
            >
        </div>
    {:else if $themes.length == 0}
        <div class="empty">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><g fill="none" stroke="var(--pro)" stroke-width="1.5"
                    ><path
                        d="M2 6c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 2 4.6 2 6 2c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.093 1.093C10 3.9 10 4.6 10 6v12c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.092C8.1 22 7.4 22 6 22c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2 20.1 2 19.4 2 18V6Z"
                    /><path
                        stroke-linecap="round"
                        d="M7 19H5"
                        opacity=".5"
                    /><path
                        d="m13.314 4.929l-2.142 2.142c-.579.578-.867.867-1.02 1.235C10 8.673 10 9.082 10 9.9v9.656l8.97-8.97c.99-.99 1.486-1.485 1.671-2.056a2.5 2.5 0 0 0 0-1.545c-.185-.57-.68-1.066-1.67-2.056c-.99-.99-1.486-1.485-2.056-1.67a2.5 2.5 0 0 0-1.545 0c-.571.185-1.066.68-2.056 1.67Z"
                    /><path
                        d="M6 22h12c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092C22 20.1 22 19.4 22 18c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.092C20.1 14 19.4 14 18 14h-2.5"
                        opacity=".5"
                    /></g
                ></svg
            >

            <h1>No themes, yet</h1>
        </div>
    {:else}
        <div class="panel-container">
            {#each $themes as theme}
                <ThemeView {theme} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .marketplace-container {
        width: 100%;
        position: fixed;
    }

    .panel-container {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .empty {
        height: calc(100vh - 160px);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 275px;
        justify-content: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .empty h1 {
        margin: 0;
        font-size: 1.3rem;
    }
    .empty svg {
        width: 128px;
        height: 128px;
        cursor: default;
    }

    #pro-btn {
        background: var(--pro);
        color: white;
        box-shadow: 0 0 10px var(--pro);
        transition: 150ms;
        font-size: 1.2rem;
        margin-top: 20px;
    }

    #pro-btn:hover {
        background: var(--pro_darken);
    }
</style>
