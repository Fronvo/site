<script lang="ts">
    import { dismissModal, findCachedAccount } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { ModalData } from 'stores/modals';
    import InfoHeader from '$lib/app/reusables/all/InfoHeader.svelte';
    import { ourData } from 'stores/profile';
    import ProfilePreviewAdd from '$lib/app/reusables/all/PreviewAdd.svelte';
    import { cachedAccountData } from 'stores/main';
    import { writable, type Writable } from 'svelte/store';
    import type { FronvoAccount } from 'interfaces/all';
    import { onMount } from 'svelte';

    let friendInfo: Writable<FronvoAccount[]> = writable([]);
    let loadingFinished = false;
    let pending = false;

    async function loadFriends(): Promise<void> {
        if ($ourData.friends.length == 0 || pending) return;

        loadingFinished = false;
        pending = true;

        $friendInfo = [];

        // Fetch all friends, notify UI once finished
        for (const friendIndex in $ourData.friends) {
            findCachedAccount(
                $ourData.friends[friendIndex],
                $cachedAccountData
            ).then((data) => {
                $friendInfo.push(data);

                checkLoadingDone();
            });
        }

        function checkLoadingDone(): void {
            // Finish loading
            if ($friendInfo.length == $ourData.friends.length) {
                loadingFinished = true;
                pending = false;
            }
        }
    }

    onMount(async () => {
        loadFriends();
    });

    const data: ModalData = {
        title: 'Add friends',
        actions: [
            {
                title: 'Done',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if $ourData.friends.length == 0}
        <h1>No friends found.</h1>
        <InfoHeader
            marginLeft={'50px'}
            text={'Other users will have to accept your request before becoming your friend.'}
        />
    {:else if loadingFinished}
        {#each $friendInfo as profileData}
            <ProfilePreviewAdd {profileData} />
        {/each}
    {/if}
</ModalTemplate>

<style>
    h1 {
        width: 75%;
        font-size: 1.2rem;
        text-align: start;
    }
</style>
