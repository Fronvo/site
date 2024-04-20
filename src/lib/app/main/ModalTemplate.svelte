<script lang="ts">
    import { isMobile } from 'stores/main';
    import {
        modalAnimDuration,
        modalLoading,
        type ModalData,
    } from 'stores/modals';
    import { scale } from 'svelte/transition';

    export let data: ModalData;

    function runCallback(callback: () => void): void {
        callback();
    }
</script>

<div
    class={`modal-container ${!data.title ? 'title-less' : ''} ${
        data.transparent ? 'transparent' : ''
    } ${data.noDecoration ? 'no-decoration' : ''} ${$isMobile ? 'mobile' : ''}`}
    transition:scale={{
        duration: modalAnimDuration * 0.5,
        start: 1.2,
    }}
>
    {#if data.title}
        <h1 id="title">{data.title}</h1>
    {/if}

    <div class="data-container">
        <slot />
    </div>

    {#if data.actions?.length > 0}
        <div class="options-container">
            {#each data.actions as { title, callback, condition, danger, primary }}
                {#if typeof condition == 'undefined' || condition}
                    <button
                        class={`${danger ? 'danger' : ''} ${
                            primary ? 'primary' : ''
                        } ${$modalLoading && primary ? 'loading' : ''}`}
                        on:click={() => !$modalLoading && runCallback(callback)}
                    >
                        {#if (primary || danger) && $modalLoading}
                            <div
                                class="loading"
                                in:scale={{
                                    duration: 125,
                                    opacity: 0,
                                    start: 0.75,
                                }}
                            >
                                <span /><span /><span />
                            </div>
                        {:else}
                            {title}
                        {/if}</button
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
        background: rgb(255, 255, 255, 0.04);
        backdrop-filter: blur(10px);
        min-width: 550px;
        max-width: 90vw;
        overflow-x: hidden;
        padding-top: 15px;
        padding-bottom: 10px;
        z-index: 4;
    }

    .no-decoration {
        padding-bottom: 0;
        border: none;
        overflow: hidden;
        background: transparent;
        backdrop-filter: none;
    }

    .title-less {
        padding-top: 0;
    }

    .transparent {
        background: transparent;
    }

    .mobile {
        width: 90vw;
        min-width: 0;
        max-width: none;
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
        color: white;
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
        height: 44px;
        font-size: 1.05rem;
        font-weight: 600;
        margin-left: 10px;
        margin-right: 10px;
        background: transparent;
        backdrop-filter: none;
        border: none;
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        box-shadow: none;
        transition: 150ms;
    }

    button:hover {
        opacity: 1;
        text-decoration: underline;
    }

    .danger {
        background: var(--red);
        color: white;
    }

    .danger:hover {
        background: var(--red_hover);
        text-decoration: none;
    }

    .primary {
        background: rgb(125, 125, 125, 0.15);
        color: white;
    }

    .primary:hover {
        background: rgb(125, 125, 125, 0.3);
        text-decoration: none;
    }

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        cursor: not-allowed;
    }

    .loading span {
        width: 6px;
        height: 6px;
        border-radius: 30px;
        background: white;
        margin-left: 5px;
        margin-right: 5px;
        animation-name: loading;
        animation-duration: 900ms;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    .loading span:nth-child(1) {
        animation-delay: 50ms;
    }

    .loading span:nth-child(2) {
        animation-delay: 75ms;
    }

    .loading span:nth-child(3) {
        animation-delay: 100ms;
    }

    @media screen and (max-width: 850px) {
        .mobile #title {
            font-size: 1.2rem;
        }

        .mobile button {
            font-size: 0.9rem;
        }
    }

    @keyframes loading {
        45% {
            transform: translateY(-2px);
        }

        100% {
            transform: translateY(2px);
        }
    }
</style>
