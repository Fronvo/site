<script lang="ts">
    import OptionsMenu from '$lib/svgs/OptionsMenu.svelte';
    import {
        dropdownImage,
        DropdownTypes,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { dataSaver } from 'stores/main';
    import {
        modalAnimDuration,
        modalInput,
        modalSide,
        type ModalData,
    } from 'stores/modals';
    import { fly } from 'svelte/transition';
    import {
        dismissDropdown,
        dismissModal,
        showDropdown,
    } from 'utilities/main';

    export let data: ModalData;
    $modalSide = data.sideModal?.side;

    function runCallback(callback: () => void): void {
        callback();
    }

    function callDropdown(dropdown: DropdownTypes): void {
        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            showDropdown(dropdown);
        }
    }

    function showImageDropdown(targetImage: string): void {
        $dropdownImage = targetImage;

        callDropdown(DropdownTypes.Image);
    }
</script>

<div
    class={`modal-container ${
        $modalSide && 'modal-side'
    } modal-side-${$modalSide}`}
    in:fly={{
        duration: modalAnimDuration,
        y: !$modalSide || document.body.clientWidth < 700 ? 25 : 0,
        x:
            $modalSide &&
            document.body.clientWidth > 700 &&
            ($modalSide == 'left' ? -100 : 100),
    }}
    out:fly={{
        duration: modalAnimDuration,
        x:
            $modalSide &&
            document.body.clientWidth > 700 &&
            ($modalSide == 'left' ? -100 : 100),
    }}
>
    <div class="header-container">
        <h1
            id="header"
            class={data.titleListener ? 'clickable' : ''}
            on:click={() => {
                if (
                    typeof data.titleListener == 'function' &&
                    data.titleListenerCondition()
                ) {
                    dismissModal();
                    data.titleListener();
                }
            }}
        >
            {#if data.titleIcon}
                <img
                    id="icon"
                    src={data.titleIcon && !$dataSaver
                        ? data.titleIcon
                        : '/svgs/profile/avatar.svg'}
                    draggable={false}
                    alt="Title icon"
                    on:contextmenu={() => showImageDropdown(data.titleIcon)}
                />
            {/if}

            {#if data.titlePreSpan}
                <span>{`${data.titlePreSpan} `}</span>
            {/if}

            <h1 id="title">
                {data.titlePreSpan
                    ? data.title[0].toLowerCase() +
                      data.title.substring(1, data.title.length)
                    : data.title}
            </h1>

            {#if data.titleDropdown}
                {#if data.titleDropdownCondition()}
                    <OptionsMenu
                        callback={() => callDropdown(data.titleDropdown)}
                    />
                {/if}
            {/if}
        </h1>

        {#if data.useInput}
            <!-- svelte-ignore a11y-autofocus -->
            <input
                class="modal-input"
                autofocus
                bind:value={$modalInput}
                maxlength={data.inputMaxLength || 15}
            />
        {/if}
    </div>

    <hr />

    <div class="data-container">
        <slot />
    </div>

    <div class="options-container">
        {#each data.actions as { title, callback, danger }}
            <button
                class={`${danger ? 'danger' : ''}`}
                on:click={() => runCallback(callback)}>{title}</button
            >
        {/each}
    </div>
</div>

<style>
    hr {
        width: 100%;
        margin-top: 5px;
        margin-bottom: 15px;
        border-color: var(--seperator_background);
    }

    .modal-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        border-radius: 10px;
        min-height: 200px;
        max-height: 90%;
        background: var(--modal_content_bg_color);
        box-shadow: 0 0 10px var(--accent_shadow_color);
        min-width: 600px;
        max-width: 70vw;
        overflow-x: hidden;
    }

    .modal-side {
        min-width: 500px;
        max-width: 500px;
        width: max-content;
        max-height: none;
        height: 100%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .modal-side-left {
        border-top-left-radius: 0;
    }

    .modal-side-right {
        border-top-right-radius: 0;
    }

    .header-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        z-index: 1;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
    }

    #header,
    #header #title {
        display: flex;
        flex-direction: row;
        text-align: center;
        align-items: center;
        font-size: 2.3rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: var(--profile_info_color);
    }

    :global(.clickable) {
        cursor: pointer;
    }

    #header #title {
        margin-left: 5px;
    }

    #header span {
        margin-right: 5px;
        color: var(--profile_info_color);
    }

    #header #icon {
        width: 55px;
        height: 55px;
        border-radius: 10px;
        margin-right: 5px;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        text-align: center;
        overflow: auto;
        width: 100%;
    }

    .options-container {
        display: flex;
        align-items: flex-end;
        flex: 1;
        height: 100%;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    button {
        font-size: 1.8rem;
        margin-left: 10px;
        margin-right: 10px;
    }

    .danger {
        color: red;
    }

    @media screen and (max-width: 700px) {
        .modal-container {
            position: fixed;
            bottom: 0;
            border-radius: 0px;
            min-width: 100%;
        }

        .modal-side {
            max-height: 90%;
            height: min-content;
        }

        :global(.clickable) {
            cursor: default;
        }

        #header,
        #header #title {
            font-size: 1.8rem;
        }

        #header #icon {
            width: 40px;
            height: 40px;
        }

        .data-container {
            min-width: auto;
            max-width: 100%;
        }

        button {
            font-size: 1.3rem;
            margin-top: 5px;
        }
    }
</style>
