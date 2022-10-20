<script lang="ts">
    import type { ModalData } from 'types/main';
    import Center from '../Center.svelte';

    export let data: ModalData;

    function runCallback(callback: () => void): void {
        callback();
    }
</script>

<div
    class={`modal-container ${
        data.removeTransparency ? 'modal-no-transparency' : ''
    }`}
>
    <div
        class={`${
            data.absolute ? 'header-container-absolute' : 'header-container'
        }`}
    >
        <h1 id="header">
            {#if data.titlePreSpan}
                <span>{`${data.titlePreSpan} `}</span>
            {/if}

            {data.title}
        </h1>
    </div>

    {#if !data.noSeperator && !data.absolute}
        <hr />
    {/if}

    <div
        class="data-container"
        style={data.extraStyling ? data.extraStyling.join('; ') : ''}
    >
        {#if data.absolute}
            <Center>
                <slot />
            </Center>
        {:else}
            <slot />
        {/if}
    </div>

    <div
        class={`${
            data.absolute ? 'options-container-absolute' : 'options-container'
        }`}
    >
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

    .modal-container-absolute {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .modal-no-transparency {
        background: var(--modal_bg_color_full);
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
        z-index: 1;
        padding-right: 10px;
    }

    .header-container-absolute {
        position: absolute;
        top: 0;
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
        min-width: 450px;
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

    .options-container-absolute {
        position: absolute;
        bottom: 20px;
    }

    button {
        font-size: 2.2rem;
        margin-right: 20px;
    }

    @media screen and (max-width: 720px) {
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
