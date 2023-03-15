<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import {
        dismissModal,
        findCachedAccount,
        setProgressBar,
    } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { onMount } from 'svelte';
    import ProfilePreview from '$lib/app/reusables/all/ProfilePreview.svelte';
    import { communityData } from 'stores/community';
    import { cachedAccountData, dataSaver } from 'stores/main';
    import type { ModalData } from 'stores/modals';
    import { DropdownTypes, targetMemberDropdown } from 'stores/dropdowns';

    let memberInfo: FronvoAccount[] = [];
    const memberInfoCopy = $dataSaver
        ? $communityData.members.slice(0, 20)
        : $communityData.members;
    let loadingFinished = false;

    async function loadCommunityMembers(): Promise<void> {
        setProgressBar(true);

        // Fetch all community members, notify UI once finished
        for (const memberIndex in memberInfoCopy) {
            findCachedAccount(
                memberInfoCopy[memberIndex],
                $cachedAccountData
            ).then((data) => {
                memberInfo.push(data);

                checkLoadingDone();
            });
        }

        function checkLoadingDone(): void {
            // Finish loading
            if (memberInfo.length == memberInfoCopy.length) {
                loadingFinished = true;
                setProgressBar(false);
            }
        }
    }

    onMount(async () => {
        await loadCommunityMembers();
    });

    const data: ModalData = {
        titlePreSpan: $communityData.members.length,
        title: 'Members',

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],

        sideModal: {
            side: 'right',
        },
    };
</script>

<ModalTemplate {data}>
    {#if loadingFinished}
        <div class="members-items-container">
            {#each memberInfo as profileData}
                <ProfilePreview
                    {profileData}
                    preDropdownCallback={() =>
                        ($targetMemberDropdown = profileData)}
                    dropdown={DropdownTypes.CommunityMember}
                />
            {/each}
        </div>
    {/if}
</ModalTemplate>

<style>
    .members-items-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto scroll;
        flex: 1;
    }

    @media screen and (max-width: 850px) {
        .members-items-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }
    }
</style>
