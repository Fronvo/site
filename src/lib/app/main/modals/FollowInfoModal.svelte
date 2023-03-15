<script lang="ts">
    import ProfilePreview from '$lib/app/reusables/all/ProfilePreview.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { cachedAccountData, dataSaver } from 'stores/main';
    import {
        followModalForFollowing,
        followModalInfo,
        type ModalData,
    } from 'stores/modals';
    import { onMount } from 'svelte';
    import {
        dismissModal,
        findCachedAccount,
        setProgressBar,
    } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    let followInfo: FronvoAccount[] = [];

    // Cap at 20 max loaded
    const followInfoCopy = $dataSaver
        ? $followModalInfo.slice(0, 10)
        : $followModalInfo;
    let loadingFinished = false;

    async function loadFollowInfo(): Promise<void> {
        setProgressBar(true);

        // Fetch all followed users, notify UI once finished

        // Sanity check for new accounts, new UI will be displayed
        if (followInfoCopy.length == 0) {
            loadingFinished = true;
            setProgressBar(false);
            return;
        }

        // Some followed users exist, fetch them
        for (const followIndex in followInfoCopy) {
            findCachedAccount(
                followInfoCopy[followIndex],
                $cachedAccountData
            ).then((data) => {
                followInfo.push(data);

                checkLoadingDone();
            });
        }

        function checkLoadingDone(): void {
            // Finish loading
            if (followInfo.length == followInfoCopy.length) {
                setProgressBar(false);
                loadingFinished = true;
            }
        }
    }

    onMount(async () => {
        await loadFollowInfo();
    });

    const data: ModalData = {
        titlePreSpan: $followModalInfo.length,
        title: $followModalForFollowing ? 'Following' : 'Followers',

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
        {#if followInfo.length == 0}
            <h1 class="modal-header">
                No {$followModalForFollowing ? 'followed users' : 'followers'}
            </h1>
        {:else}
            <div class="following-items-container">
                {#each followInfo as profileData}
                    <ProfilePreview {profileData} />
                {/each}
            </div>
        {/if}
    {/if}
</ModalTemplate>

<style>
    .following-items-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto scroll;
        flex: 1;
    }

    @media screen and (max-width: 850px) {
        .following-items-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }
    }
</style>
