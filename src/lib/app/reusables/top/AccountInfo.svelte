<script lang="ts">
    import { DropdownTypes, dropdownForAccountInfo } from 'stores/dropdowns';
    import { targetProfileModal } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { onMount } from 'svelte';
    import { showDropdown } from 'utilities/main';

    export let preview = false;
    export let editable = false;
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

        showDropdown(DropdownTypes.Profile, container, 'top');

        $dropdownForAccountInfo = true;
    }
</script>

<div class="account-container">
    <div
        on:click={showProfileDropdown}
        on:keydown={showProfileDropdown}
        class="main-container"
        bind:this={container}
    >
        <img
            src={$ourData.avatar ? $ourData.avatar : '/images/avatar.svg'}
            draggable={false}
            alt={`${$ourData.profileId}\'s avatar'`}
        />

        <span class="indicator" />

        <div class="name-container">
            <h1 id="name">{$ourData.username}</h1>
            <h1 id="status">Online</h1>
        </div>
    </div>

    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><path
            fill-rule="evenodd"
            d="M12.428 2c-1.114 0-2.129.6-4.157 1.802l-.686.406C5.555 5.41 4.542 6.011 3.985 7c-.557.99-.557 2.19-.557 4.594v.812c0 2.403 0 3.605.557 4.594c.557.99 1.57 1.59 3.6 2.791l.686.407C10.299 21.399 11.314 22 12.428 22c1.114 0 2.128-.6 4.157-1.802l.686-.407c2.028-1.2 3.043-1.802 3.6-2.791c.557-.99.557-2.19.557-4.594v-.812c0-2.403 0-3.605-.557-4.594c-.557-.99-1.572-1.59-3.6-2.792l-.686-.406C14.555 2.601 13.542 2 12.428 2Zm-3.75 10a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0Z"
            clip-rule="evenodd"
        /></svg
    >
</div>

<style>
    .account-container {
        display: flex;
        align-items: center;
        width: 235px;
        background: var(--primary);
        z-index: 1;
        transition: 150ms;
        padding: 5px;
        user-select: none;
    }

    .main-container {
        display: flex;
        align-items: center;
        padding: 5px;
        border-radius: 3px;
        flex: 1;
        margin-right: 10px;
        cursor: pointer;
    }

    .main-container:hover {
        background: var(--secondary);
    }

    img {
        width: 36px;
        height: 36px;
        border-radius: 30px;
    }

    .indicator {
        width: 18px;
        height: 18px;
        background: rgb(72, 202, 113);
        border-radius: 50px;
        border: 4px solid var(--primary);
        transform: translateY(12px) translateX(-16px);
    }

    #name,
    #status {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 600;
        transform: translateX(-10px);
        white-space: nowrap;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #status {
        font-size: 0.8rem;
        color: rgb(153, 158, 168);
    }

    svg {
        fill: rgb(129, 133, 141);
        width: 40px;
        height: 40px;
        padding: 8px;
        margin-right: 5px;
    }

    svg:hover {
        fill: rgb(207, 215, 230);
        background: var(--secondary);
        border-radius: 5px;
    }
</style>
