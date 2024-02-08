<script lang="ts">
    import { dismissModal, findCachedAccount } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { ourData } from 'stores/profile';
    import PreviewInvite from '$lib/app/reusables/all/PreviewInvite.svelte';
    import type { ModalData } from 'stores/modals';
    import { tempCurrentServer } from 'stores/rooms';
    import { cachedAccountData } from 'stores/main';
    import { onMount } from 'svelte';

    let friendsInfo: FronvoAccount[] = [];
    let friendsLoadingFinished = false;

    async function loadFriends(): Promise<void> {
        friendsInfo = [];

        if ($ourData.friends.length == 0) {
            friendsLoadingFinished = true;
            return;
        }

        // Fetch all room members, notify UI once finished
        for (const friendIndex in $ourData.friends) {
            findCachedAccount(
                $ourData.friends[friendIndex],
                $cachedAccountData
            ).then((data) => {
                friendsInfo.push(data);

                checkLoadingDone();
            });
        }

        function checkLoadingDone(): void {
            // Finish loading
            if (friendsInfo.length == $ourData?.friends.length) {
                friendsLoadingFinished = true;

                friendsInfo = friendsInfo;
            }
        }
    }
    const data: ModalData = {
        title: `Invite people to ${$tempCurrentServer?.name}`,
        actions: [
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };

    onMount(loadFriends);
</script>

<ModalTemplate {data}>
    {#if friendsLoadingFinished}
        {#each friendsInfo as { avatar, profileId }}
            <PreviewInvite
                {avatar}
                {profileId}
                invite={$tempCurrentServer.invite}
                isInServer={$tempCurrentServer.members.includes(profileId)}
            />
        {/each}
    {/if}
</ModalTemplate>
