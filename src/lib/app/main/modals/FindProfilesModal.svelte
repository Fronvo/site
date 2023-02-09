<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { dataSaver, socket } from 'stores/all';
    import { cachedAccountData } from 'stores/main';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import type { ModalData } from 'types/main';
    import {
        dismissModal,
        fetchUser,
        findCachedAccount,
        setProgressBar,
    } from 'utilities/main';
    import { loadProfilePanel } from 'utilities/profile';
    import ModalTemplate from '../ModalTemplate.svelte';

    let searchValue: Writable<string> = writable('');
    let findResults: FronvoAccount[] = [];
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
        if (targetIds.length == 0) {
            loadingFinished = true;
            return;
        }

        for (const idIndex in targetIds) {
            const targetUser = findCachedAccount(
                targetIds[idIndex],
                $cachedAccountData
            );

            if (targetUser) {
                findResults.push(targetUser);

                checkLoadingDone();
            } else {
                // Not cached, fetch
                fetchUser(targetIds[idIndex]).then((user) => {
                    findResults.push(user);

                    // Update cache
                    $cachedAccountData.push(user);

                    checkLoadingDone();
                });
            }
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

    async function viewProfile(accountIndex: number): Promise<void> {
        dismissModal();

        await loadProfilePanel(
            $cachedAccountData,
            findResults[accountIndex].profileId
        );
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
    <!-- svelte-ignore a11y-autofocus -->
    <input
        class="modal-input"
        autofocus
        bind:value={$searchValue}
        maxlength={30}
    />

    {#if loadingFinished}
        {#if findResults.length == 0}
            <Center absolute>
                <h1 class="modal-header" in:fade={{ duration: 250 }}>
                    No results
                </h1>
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
        background: transparent;
        box-shadow: 0 0 10px var(--accent_shadow_color);
        width: 200px;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-right: 10px;
        margin-left: 10px;
        height: 235px;
        overflow: hidden;
        border-radius: 5px;
        padding: 10px;
        transition: 200ms;
        cursor: pointer;
    }

    .find-items-container div:hover {
        opacity: 0.8;
    }

    .find-items-container div h1 {
        margin: 0;
    }

    .find-items-container div h1 span {
        color: var(--profile_info_color);
    }

    .find-items-container div #profileId {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.9rem;
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
        font-size: 1.7rem;
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
        width: 100px;
        height: 100px;
        border-radius: 10px;
    }

    @media screen and (max-width: 1100px) {
        .find-items-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }

        .find-items-container div {
            width: 300px;
            height: 75px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            margin: 10px;
            margin-bottom: 5px;
            cursor: default;
        }

        .find-items-container div:hover {
            opacity: 1;
        }

        .find-items-container div:nth-child(1) {
            margin-left: 10px;
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
    }

    @media screen and (max-width: 520px) {
        .find-items-container div {
            height: 65px;
        }

        .find-items-container div #profileId {
            font-size: 1.5rem;
        }

        .find-items-container div #avatar {
            width: 58px;
            height: 58px;
        }
    }
</style>
