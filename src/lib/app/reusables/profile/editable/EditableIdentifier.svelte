<script lang="ts">
    import { DropdownTypes } from 'stores/dropdowns';
    import { isMobile, mousePos } from 'stores/main';
    import { ourData } from 'stores/profile';
    import type { Writable } from 'svelte/store';
    import { showDropdown, showDropdownMouse } from 'utilities/main';

    export let username: Writable<string>;

    let menu: SVGElement;

    function showOptions(): void {
        if (!$isMobile) {
            showDropdownMouse(DropdownTypes.AccountExtras, $mousePos);
        } else {
            showDropdown(DropdownTypes.AccountExtras, menu, 'bottom', -100);
        }
    }
</script>

<div class={`identifier-container ${$isMobile ? 'mobile' : ''}`}>
    <div class="info-container">
        <div class="lock-container">
            <input bind:value={$username} maxlength={30} />

            <span />

            <svg
                bind:this={menu}
                on:click={showOptions}
                on:keydown={showOptions}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 20 20"
                fill="currentColor"
                ><path
                    d="M10 12a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0-6a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 12a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                /></svg
            >
        </div>

        <div class="secondary-container">
            <h1 id="identifier">
                {$ourData.profileId}
            </h1>
        </div>

        {#if $ourData.status}
            <h1 id="status">{$ourData.status}</h1>
        {/if}
    </div>
</div>

<style>
    .identifier-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 15px;
    }

    .info-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        flex: 1;
    }

    .lock-container {
        display: flex;
        align-items: center;
        width: 100%;
    }

    input {
        width: 200px;
        height: 35px;
        background: var(--secondary);
        border: 2px solid transparent;
        transition: 150ms;
        font-size: 1.5rem;
        margin: 0;
        margin-right: 5px;
        margin-bottom: 5px;
        color: var(--text);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-weight: 500;
    }

    input:focus {
        border: 2px solid var(--text);
    }

    .lock-container span {
        flex: 1;
    }

    .lock-container svg {
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        margin-right: 5px;
        transform: translateY(-2px);
        fill: var(--gray);
        border-radius: 30px;
        padding: 4px;
        transition: 125ms;
    }

    .lock-container svg:hover {
        fill: var(--bg);
        background: var(--text);
    }

    .secondary-container {
        display: flex;
        align-items: center;
    }

    #identifier {
        font-size: 1.05rem;
        margin: 0;
        font-weight: 500;
        margin-right: 5px;
        margin-left: 5px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        color: var(--text);
    }

    #status {
        font-size: 0.9rem;
        margin: 0;
        margin-right: 5px;
        margin-left: 5px;
        margin-top: 10px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        color: var(--text);
    }

    @media screen and (max-width: 850px) {
        .mobile input {
            font-size: 1.3rem;
        }

        .mobile #identifier {
            font-size: 0.95rem;
        }

        .mobile #status {
            font-size: 0.8rem;
        }
    }
</style>
