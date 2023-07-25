<script lang="ts">
    import { ourData } from 'stores/profile';
    import { onMount } from 'svelte';

    export let brandingWhite: string;
    export let brandingDarkenWhite: string;
    export let brandingDark: string;
    export let brandingDarkenDark: string;

    let bW: HTMLInputElement;
    let bWBox: HTMLDivElement;
    let bDW: HTMLInputElement;
    let bDWBox: HTMLDivElement;
    let bD: HTMLInputElement;
    let bDBox: HTMLDivElement;
    let bDD: HTMLInputElement;
    let bDDBox: HTMLDivElement;

    onMount(() => {
        setTimeout(() => {
            bW.onkeydown = () => {
                setTimeout(() => {
                    bWBox.style.background = `#${bW.value}`;
                }, 0);
            };

            bDW.onkeydown = () => {
                setTimeout(() => {
                    bDWBox.style.background = `#${bDW.value}`;
                }, 0);
            };

            bD.onkeydown = () => {
                setTimeout(() => {
                    bDBox.style.background = `#${bD.value}`;
                }, 0);
            };

            bDD.onkeydown = () => {
                setTimeout(() => {
                    bDDBox.style.background = `#${bDD.value}`;
                }, 0);
            };
        }, 0);
    });
</script>

<div class={`colors-container ${$ourData.appliedTheme ? 'themed' : ''}`}>
    <h1>White</h1>

    <div class="preview">
        <div bind:this={bWBox} id="preview-box" />

        <input maxlength={6} bind:value={brandingWhite} bind:this={bW} />
    </div>

    <div class="preview">
        <div bind:this={bDWBox} id="preview-box" />

        <input maxlength={6} bind:value={brandingDarkenWhite} bind:this={bDW} />
    </div>

    <h1>Dark</h1>

    <div class="preview">
        <div bind:this={bDBox} id="preview-box" />

        <input maxlength={6} bind:value={brandingDark} bind:this={bD} />
    </div>

    <div class="preview">
        <div bind:this={bDDBox} id="preview-box" />

        <input maxlength={6} bind:value={brandingDarkenDark} bind:this={bDD} />
    </div>
</div>

<style>
    .colors-container {
        margin-left: 30px;
        margin-right: 30px;
    }

    h1 {
        margin: 0;
        font-size: 1.5rem;
    }

    .preview {
        margin-top: 5px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
    }

    input {
        background: var(--modal_input_bg);
        font-size: 1.1rem;
        width: 100px;
        background: var(--modal_input_bg);
        border: 2px solid var(--modal_input_bg);
        transition: 150ms;
    }

    input:focus {
        border: 2px solid var(--pro);
    }

    #preview-box {
        width: 32px;
        height: 32px;
        background: var(--modal_input_bg);
        border-radius: 5px;
        margin-right: 15px;
        transition: 150ms;
    }

    .themed input:focus {
        border: 2px solid var(--branding);
    }
</style>
