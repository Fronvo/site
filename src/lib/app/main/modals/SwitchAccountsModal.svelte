<script lang="ts">
    import {
        dismissModal,
        initSecondarySocket,
        showModal,
    } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { ModalTypes, type ModalData } from 'stores/modals';
    import ProfilePreviewSwitch from '$lib/app/reusables/all/ProfilePreviewSwitch.svelte';
    import type { SwitchedAccount } from 'interfaces/all';
    import { getKey } from 'utilities/global';
    import { currentToken, setSecondarySocket } from 'stores/main';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { onDestroy, onMount } from 'svelte';
    import { ourData } from 'stores/profile';

    let savedAccounts: SwitchedAccount[] = JSON.parse(
        getKey('savedAccounts', '[]')
    );

    function addAccount(): void {
        showModal(ModalTypes.AddAccount);
    }

    onMount(() => {
        initSecondarySocket();
    });

    onDestroy(() => {
        setSecondarySocket(undefined);
    });

    const data: ModalData = {
        title: 'Switch accounts',
        actions: [
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if savedAccounts.length == 0}
        <ProfilePreviewSwitch
            avatar={$ourData.avatar}
            username={$ourData.username}
            token={$currentToken}
        />
    {:else}
        {#each savedAccounts as { avatar, username, token }}
            <ProfilePreviewSwitch {avatar} {username} {token} />
        {/each}
    {/if}

    <button on:click={addAccount}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><path
                fill="var(--branding)"
                fill-rule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Zm.75-13a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clip-rule="evenodd"
            /></svg
        >Add account</button
    >

    {#if !getKey('token')}
        <InfoHeader
            text={'Adding any account will save your credentials in this browser'}
        />
    {/if}
</ModalTemplate>

<style>
    button {
        width: 75%;
        display: flex;
        align-items: center;
        font-size: 0.96rem;
        margin-bottom: 5px;
        box-shadow: none;
        transition: 0;
        background: none;
    }

    button:hover {
        background: var(--primary);
    }

    svg {
        width: 26px;
        height: 26px;
        margin-right: 10px;
    }
</style>
