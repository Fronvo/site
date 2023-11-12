<script lang="ts">
    import { modalAnimDuration, type ModalData } from 'stores/modals';
    import { bounceInOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';

    export let data: ModalData;

    function runCallback(callback: () => void): void {
        callback();
    }
</script>

<div
    class={`modal-container ${!data.title ? 'title-less' : ''}`}
    transition:scale={{
        duration: modalAnimDuration * 0.5,
        start: 0.8,
        easing: bounceInOut,
    }}
>
    {#if data.title}
        <h1 id="title">{data.title}</h1>
    {/if}

    <div class="data-container">
        <slot />
    </div>

    {#if data.actions.length > 0}
        <div class="options-container">
            {#each data.actions as { title, callback, condition, danger, primary, pro }}
                {#if typeof condition == 'undefined' || condition}
                    <button
                        class={`${danger ? 'danger' : ''} ${
                            primary ? 'primary' : ''
                        } ${pro ? 'pro' : ''}`}
                        on:click={() => runCallback(callback)}
                    >
                        {title}</button
                    >
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .modal-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        border-radius: 5px;
        min-height: 200px;
        max-height: 95%;
        background: var(--primary);
        border: 1px solid var(--bg);
        border-radius: 5px;
        min-width: 550px;
        max-width: 90vw;
        overflow-x: hidden;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .title-less {
        padding-top: 0;
    }

    #title {
        font-size: 1.6rem;
        font-weight: 600;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .title-less .data-container {
        margin-top: 0;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        overflow: auto;
        width: 100%;
        flex: 1;
        margin-top: 10px;
    }

    .options-container {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        align-items: flex-end;
        width: 100%;
        padding-bottom: 10px;
        padding-top: 10px;
    }

    button {
        width: 150px;
        font-size: 1.05rem;
        font-weight: 600;
        margin-left: 10px;
        margin-right: 10px;
        background: transparent;
        border: none;
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--primary);
        box-shadow: 0 0 10px var(--primary);
        transition: 150ms;
    }

    button:hover {
        opacity: 1;
        text-decoration: underline;
    }

    .danger {
        background: rgb(231, 2, 2);
        color: white;
    }

    .danger:hover {
        background: rgb(187, 4, 4);
        text-decoration: none;
    }

    .primary {
        background: var(--branding);
        box-shadow: 0 0 5px var(--branding);
        color: white;
    }

    .primary:hover {
        background: var(--branding_darken);
    }

    .pro {
        background: var(--pro);
        color: white;
        box-shadow: 0 0 10px var(--pro);
    }

    .pro:hover {
        background: var(--pro_darken);
    }
</style>
