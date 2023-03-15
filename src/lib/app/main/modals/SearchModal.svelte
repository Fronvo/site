<script lang="ts">
    import ProfilePreview from '$lib/app/reusables/all/ProfilePreview.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { cachedAccountData, socket } from 'stores/main';
    import { modalInput, type ModalData } from 'stores/modals';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import {
        dismissModal,
        findCachedAccount,
        setProgressBar,
    } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    let findResults: FronvoAccount[] = [];
    let loadingFinished = false;

    modalInput.subscribe((newSearch) => {
        // Return if no value
        if (!newSearch) {
            // Reset previous results
            findResults = [];
            loadingFinished = true;
            return;
        }

        newSearch = newSearch.trim();

        // Return if empty without spaces
        if (!newSearch) {
            loadingFinished = true;
            return;
        }

        // If it contains some value, set a timeout for searching
        setTimeout(() => {
            // Abort if theres a new search value meanwhile
            if ($modalInput != newSearch) {
                return;
            }

            setProgressBar(true);

            loadingFinished = false;

            socket.emit(
                'findProfiles',
                { profileId: $modalInput, maxResults: '10' },
                ({ err, findResults }) => {
                    if (err) {
                        loadingFinished = true;
                    } else {
                        loadProfiles(findResults);
                    }

                    setProgressBar(false);
                }
            );
        }, 250);
    });

    async function loadProfiles(targetIds: string[]): Promise<void> {
        // Reset previous results
        findResults = [];

        // Should contain some id, none found otherwise
        if (targetIds.length == 0) {
            loadingFinished = true;
            return;
        }

        for (const idIndex in targetIds) {
            findCachedAccount(targetIds[idIndex], $cachedAccountData).then(
                (data) => {
                    findResults.push(data);

                    checkLoadingDone();
                }
            );
        }

        function checkLoadingDone(): void {
            if (
                findResults.length == targetIds.length ||
                targetIds.length == 1
            ) {
                loadingFinished = true;
            }
        }
    }

    onMount(() => {
        loadingFinished = true;
    });

    const data: ModalData = {
        title: 'Search',

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],

        sideModal: {
            side: 'left',
        },

        useInput: true,
        inputMaxLength: 30,
    };
</script>

<ModalTemplate {data}>
    {#if loadingFinished}
        {#if findResults.length != 0}
            <div class="find-items-container" in:fade={{ duration: 250 }}>
                {#each findResults as profileData}
                    <ProfilePreview {profileData} />
                {/each}
            </div>
        {/if}
    {/if}
</ModalTemplate>

<style>
    .find-items-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto scroll;
        flex: 1;
    }

    @media screen and (max-width: 850px) {
        .find-items-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }
    }
</style>
