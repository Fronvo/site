<script lang="ts">
    import {
        dismissModal,
        initSecondarySocket,
        showModal,
    } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { ModalTypes, type ModalData } from 'stores/modals';
    import ProfilePreviewSwitch from '$lib/app/reusables/all/PreviewSwitch.svelte';
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
                title: 'Add account',
                callback: addAccount,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if savedAccounts.length == 0}
        <ProfilePreviewSwitch
            avatar={$ourData.avatar}
            profileId={$ourData.profileId}
            token={$currentToken}
        />
    {:else}
        {#each savedAccounts as { avatar, profileId, token }}
            <ProfilePreviewSwitch {avatar} {profileId} {token} />
        {/each}
    {/if}
</ModalTemplate>
