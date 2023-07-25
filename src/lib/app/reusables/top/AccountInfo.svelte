<script lang="ts">
    import { DropdownTypes, dropdownForAccountInfo } from 'stores/dropdowns';
    import { targetProfileModal } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { onMount } from 'svelte';
    import { showDropdown } from 'utilities/main';
    import HomeButton from './HomeButton.svelte';

    export let preview = false;
    export let editable = false;
    export let editableStatus: string = '';
    export let editableCallback = () => {};

    let element: HTMLInputElement;
    let container: HTMLDivElement;

    onMount(() => {
        if (editable) {
            element.focus();

            element.onkeyup = (ev) => {
                if (ev.key == 'Enter') {
                    editableCallback();
                }
            };
        }
    });

    function showProfileDropdown(): void {
        if (preview) return;

        $targetProfileModal = $ourData;

        showDropdown(DropdownTypes.Profile, container, 'bottom', 30, 25);

        $dropdownForAccountInfo = true;
    }
</script>

<div
    class={`account-container ${preview ? 'preview' : ''} ${
        editable ? 'editable' : ''
    }`}
>
    {#if !preview && !editable}
        <HomeButton />
    {/if}

    <div
        class="info-container"
        bind:this={container}
        on:click={showProfileDropdown}
        on:keydown={showProfileDropdown}
    >
        {#if $ourData.avatar}
            <img alt="Avatar" src={$ourData.avatar} draggable={false} />
        {:else}
            <svg
                id="avatar"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 256 256"
                ><path
                    fill="var(--branding)"
                    d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z"
                /></svg
            >
        {/if}

        <div class="wrapper">
            <h1 id="name">{$ourData.username}</h1>

            {#if $ourData.status && !editable}
                <h1 id="status">{$ourData.status}</h1>
            {/if}

            {#if editable}
                <input
                    bind:this={element}
                    bind:value={editableStatus}
                    maxlength={20}
                    class="modal-input"
                    placeholder="Status 😉"
                />
            {/if}
        </div>
    </div>
</div>

<style>
    .account-container {
        display: flex;
        align-items: center;
        padding: 5px;
        padding-left: 10px;
        width: 275px;
        border-right: 1px solid var(--primary);
        border-bottom: 1px solid var(--primary);
        height: 65px;
        z-index: 1;
        transition: 75ms;
        box-shadow: 0 -5px 4px var(--message_shadow);
    }

    .preview {
        border: none;
        box-shadow: none;
        cursor: default;
    }

    .preview .info-container {
        text-align: start;
        margin-left: 5px;
    }

    .preview img {
        width: 38px;
        height: 38px;
    }

    .editable {
        width: max-content;
    }

    img,
    svg {
        width: 38px;
        height: 38px;
        margin-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 30px;
    }

    .info-container {
        display: flex;
        align-items: center;
        height: 100%;
        flex: 1;
        max-width: 225px;
        border-radius: 10px;
        padding: 7px;
        margin: 10px;
        margin-right: 0;
        cursor: pointer;
    }

    .preview .info-container {
        max-width: 100%;
        margin: 0;
        padding: 0;
        margin-right: 80px;
        cursor: default;
    }

    .info-container:hover {
        background: var(--primary);
    }

    .preview .info-container:hover {
        background: transparent;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
    }

    #name {
        margin: 0;
        font-size: 1.1rem;
        overflow: hidden;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .preview #name {
        margin-left: 5px;
    }

    #status {
        margin: 0;
        font-size: 0.9rem;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        color: var(--branding);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-weight: 600;
    }

    input {
        font-size: 1.15rem;
        width: 300px;
    }

    @media screen and (max-width: 1250px) {
        .account-container {
            flex-direction: column;
            height: max-content;
            justify-content: center;
            align-items: center;
            width: max-content;
            border-bottom: 0;
            border-right: 0;
        }

        svg {
            margin-right: 0;
        }

        img {
            margin-right: 0;
        }

        #name {
            display: none;
        }

        .preview #name {
            display: initial;
        }

        #status {
            display: none;
        }

        .info-container {
            justify-content: center;
            align-items: center;
            align-self: center;
            justify-self: center;
            width: 60px;
            margin-left: 0;
        }
    }
</style>
