<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { dataSaver, socket } from 'stores/all';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import type { ModalData } from 'types/main';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { loadProfilePanel } from 'utilities/profile';
    import ModalTemplate from '../ModalTemplate.svelte';

    let searchValue: Writable<string> = writable('');
    let findResults: FronvoAccount[] = [];
    let errorMessage: string;
    let loadingFinished = false;

    searchValue.subscribe((newSearch) => {
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
            if ($searchValue != newSearch) {
                return;
            }

            setProgressBar(true);

            loadingFinished = false;

            socket.emit(
                'findProfiles',
                { profileId: $searchValue, maxResults: '10' },
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

    function loadProfiles(targetIds: string[]): void {
        // Reset previous results
        findResults = [];

        // Should contain some id, none found otherwise
        if (targetIds.length > 0) {
            for (const idIndex in targetIds) {
                socket.emit(
                    'fetchProfileData',
                    { profileId: targetIds[idIndex] },
                    ({ profileData }) => {
                        findResults.push(profileData);

                        // Finish loading if we're at the last id
                        if (
                            findResults.length == targetIds.length ||
                            targetIds.length == 1
                        ) {
                            loadingFinished = true;
                        }
                    }
                );
            }
        } else {
            loadingFinished = true;
        }
    }

    async function viewProfile(accountIndex: number): Promise<void> {
        dismissModal();

        await loadProfilePanel(findResults[accountIndex].profileId);
    }

    onMount(() => {
        loadingFinished = true;
    });

    const data: ModalData = {
        title: 'Find profiles',
        noSeperator: true,

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if errorMessage}
        <h1 id="error-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <!-- svelte-ignore a11y-autofocus -->
    <input autofocus bind:value={$searchValue} maxlength={30} />

    {#if loadingFinished}
        {#if findResults.length == 0}
            <Center absolute>
                <h1 id="no-results" in:fade={{ duration: 250 }}>No results</h1>
            </Center>
        {:else}
            <div class="find-items-container" in:fade={{ duration: 250 }}>
                {#each findResults as { profileId, following, followers, avatar, isFollower, isPrivate, isSelf }, i}
                    <div on:click={() => viewProfile(i)}>
                        <img
                            id="avatar"
                            src={avatar && !$dataSaver
                                ? avatar
                                : '/svgs/profile/avatar.svg'}
                            alt={`${profileId}'s avatar`}
                            draggable={false}
                        />
                        <h1 id="profileId">{profileId}</h1>

                        <h1 id="following">
                            <span
                                >{isFollower || isSelf || !isPrivate
                                    ? following.length
                                    : '?'}</span
                            > following
                        </h1>
                        <h1 id="followers">
                            <span
                                >{isFollower || isSelf || !isPrivate
                                    ? followers.length
                                    : '?'}</span
                            > followers
                        </h1>
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
</ModalTemplate>

<style>
    input {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 95%;
        max-width: max-content;
        background: var(--modal_input_bg_color);
    }

    .find-items-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto;
        flex: 1;
    }

    .find-items-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto;
        flex: 1;
    }

    .find-items-container div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--accent_bg_color);
        box-shadow: 0 0 5px var(--accent_shadow_color);
        width: 300px;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-right: 10px;
        margin-left: 10px;
        height: min-content;
        border-radius: 10px;
        padding: 10px;
        transition: 400ms background;
        cursor: pointer;
    }

    .find-items-container div:hover {
        background-position: right center;
    }

    .find-items-container div h1 {
        margin: 0;
    }

    .find-items-container div h1 span {
        color: var(--profile_info_color);
    }

    .find-items-container div #profileId {
        font-size: 2.5rem;
        color: var(--profile_info_color);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .find-items-container div #following,
    .find-items-container div #followers {
        font-size: 2.1rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .find-items-container div #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 128px;
        height: 128px;
        border-radius: 10px;
    }

    #no-results {
        font-size: 2.3rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 1100px) {
        input {
            font-size: 1.7rem;
        }

        .find-items-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }

        .find-items-container div {
            width: 300px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            margin: 10px;
            margin-bottom: 5px;
            cursor: default;
        }

        .find-items-container div #profileId {
            font-size: 1.7rem;
            cursor: default;
        }

        .find-items-container div #following,
        .find-items-container div #followers {
            display: none;
        }

        .find-items-container div #avatar {
            width: 64px;
            height: 64px;
            margin-right: 5px;
        }

        #no-results {
            font-size: 2rem;
        }
    }

    @media screen and (max-width: 520px) {
        input {
            font-size: 1.4rem;
        }

        .find-items-container div {
            width: 280px;
            margin-bottom: 5px;
            padding: 5px;
        }

        .find-items-container div #profileId {
            font-size: 1.7rem;
        }

        .find-items-container div #following,
        .find-items-container div #followers {
            font-size: 1.7rem;
        }

        #no-results {
            font-size: 1.7rem;
        }
    }
</style>
