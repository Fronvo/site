<script lang="ts">
    import type { ModalData } from 'types/main';

    export let data: ModalData;

    function runCallback(callback: () => void): void {
        callback();
    }
</script>

<div class="modal-container">
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

    <div
        class="data-container"
        style={data.extraStyling ? data.extraStyling.join('; ') : ''}
    >
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
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
        z-index: 1;
        padding-right: 10px;
    }

    .header-container #header {
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

    .header-container #header span {
        color: var(--profile_info_color);
    }

    .data-container {
        display: flex;
        flex-direction: column;
        min-width: 450px;
        text-align: center;
        align-items: center;
    }

    .options-container {
        display: flex;
        align-items: flex-end;
        flex: 1;
        height: 100%;
        margin-bottom: 10px;
        margin-top: 20px;
    }

    .options-container button {
        font-size: 2.2rem;
        margin-right: 20px;
    }

    @media screen and (max-width: 720px) {
        hr {
            margin-bottom: 20px;
        }

        .header-container #header {
            font-size: 2.4rem;
        }

        .data-container {
            width: 350px;
            min-width: auto;
        }

        .options-container button {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        .data-container {
            width: 300px;
        }

        .options-container button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
