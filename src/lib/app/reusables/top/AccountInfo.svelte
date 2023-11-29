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
            <h1 id="status">{$ourData.status ? $ourData.status : 'Online'}</h1>
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
            d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.409 0-1.779.152a2.008 2.008 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.615 1.615 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.026 2.026 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361c0 .558-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a1.99 1.99 0 0 0-.399 1.479c.053.394.287.798.757 1.605c.47.807.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2.008 2.008 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a1.99 1.99 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361c0-.558.306-1.064.782-1.36c.324-.203.533-.364.682-.556a1.99 1.99 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605c-.47-.807-.704-1.21-1.022-1.453a2.026 2.026 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.615 1.615 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2.007 2.007 0 0 0-1.09-1.083ZM12.5 15c1.67 0 3.023-1.343 3.023-3S14.169 9 12.5 9c-1.67 0-3.023 1.343-3.023 3s1.354 3 3.023 3Z"
            clip-rule="evenodd"
        /></svg
    >
</div>

<style>
    .account-container {
        display: flex;
        align-items: center;
        width: 235px;
        background: rgb(26, 27, 30);
        z-index: 1;
        transition: 150ms;
        padding: 5px;
        user-select: none;
    }

    .main-container {
        display: flex;
        align-items: center;
        padding: 5px;
        border-radius: 10px;
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

    #name {
        font-weight: 600;
    }

    #name,
    #status {
        margin: 0;
        font-size: 0.9rem;
        transform: translateX(-10px);
        white-space: nowrap;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #status {
        font-size: 0.8rem;
        color: var(--gray);
    }

    svg {
        fill: var(--gray);
        width: 40px;
        height: 40px;
        padding: 8px;
        margin-right: 5px;
        border-radius: 10px;
    }

    svg:hover {
        fill: var(--gray_hover);
        background: var(--secondary);
    }
</style>
