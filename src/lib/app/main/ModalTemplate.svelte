<script lang="ts">
    import { modalAnimDuration } from 'stores/main';
    import { backOut } from 'svelte/easing';
    import { scale } from 'svelte/transition';
    import type { ModalData } from 'types/main';

    export let data: ModalData;

    function runCallback(callback: () => void): void {
        callback();
    }
</script>

<div
    class="modal-container"
    transition:scale={{
        duration: modalAnimDuration,
        start: 1.05,
        easing: backOut,
    }}
>
    <div class="header-container">
        <h1 id="header">
            {#if data.titlePreSpan}
                <span>{`${data.titlePreSpan} `}</span>
            {/if}

            {data.title}
        </h1>
    </div>

    {#if !data.noSeperator}
        <hr />
    {/if}

    <div class="data-container">
        <slot />
    </div>

    <div class="options-container">
        {#each data.actions as { title, callback }}
            <button on:click={() => runCallback(callback)}>{title}</button>
        {/each}
    </div>
</div>

<style>
    hr {
        width: 100px;
        z-index: 1;
    }

    .modal-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        border-radius: 25px;
        min-height: 75%;
        max-height: 90%;
        background: var(--modal_content_bg_color);
        box-shadow: 0 0 5px var(--modal_content_shadow_bg_color);
        min-width: 40%;
        max-width: 60%;
        padding: 5px;
        overflow-x: hidden;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
        z-index: 1;
        padding-right: 10px;
    }

    #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #header span {
        color: var(--profile_info_color);
    }

    .data-container {
        display: flex;
        flex-direction: column;
        min-width: 500px;
        text-align: center;
        align-items: center;
    }

    .options-container {
        display: flex;
        align-items: flex-end;
        flex: 1;
        height: 100%;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    button {
        font-size: 2.2rem;
        margin-right: 20px;
    }

    @media screen and (max-width: 720px) {
        .modal-container {
            max-width: none;
            max-height: 90%;
            min-width: 85%;
            max-width: 95%;
            border-radius: 25px;
        }

        hr {
            margin-bottom: 20px;
        }

        #header {
            font-size: 2.4rem;
        }

        .data-container {
            width: 350px;
            min-width: auto;
        }

        button {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        #header {
            font-size: 2rem;
        }

        .data-container {
            width: 300px;
        }

        button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
