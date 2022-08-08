<script lang="ts">
    import { goto } from '$app/navigation';

    import Center from '$lib/app/Center.svelte';
    import Loading from '$lib/app/Loading.svelte';
    import type { FronvoAccount } from 'interfaces/app/main';
    import { modalAnimDuration, modalVisible } from 'stores/app/main';
    import { targetProfile, userData, userPosts } from 'stores/app/profile';
    import { socket } from 'stores/global';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { fetchUser } from 'utilities/app/main';
    import { loadProfilePosts } from 'utilities/app/profile';

    let searchValue: Writable<string> = writable('');
    let findResults: FronvoAccount[] = [];
    let errorMessage: string;
    let loadingFinished = false;

    $: loadingFinished = true;

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
                }
            );
        }, 500);
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
        $modalVisible = false;

        setTimeout(() => {
            goto(`/profile/${newProfile}`, {
                replaceState: true,
            });
        }, modalAnimDuration);

        // Reset everything for cool transitions
        userData.set(undefined);
        userPosts.set(undefined);

        // Start loading the new profile
        const newProfile = findResults[accountIndex].profileId;

        $targetProfile = newProfile;

        // Update profile panel
        $userData = await fetchUser(newProfile);

        const isAccessible =
            $userData.isFollower || $userData.isSelf || !$userData.isPrivate;

        if (isAccessible) {
            await loadProfilePosts(newProfile);
        } else {
            userPosts.set([]);
        }
    }
</script>

<div class="find-container">
    <div class="header-container">
        <h1 id="header">Find profiles</h1>

        {#if errorMessage}
            <h1 id="error-header" in:fade={{ duration: 500 }}>
                {errorMessage}
            </h1>
        {/if}

        <!-- svelte-ignore a11y-autofocus -->
        <input autofocus bind:value={$searchValue} maxlength={30} />
    </div>

    <hr />

    {#if loadingFinished}
        {#if findResults.length == 0}
            <Center>
                <h1 id="no-results" in:fade={{ duration: 300 }}>No results</h1>
            </Center>
        {:else}
            <div class="find-items-container" in:fade={{ duration: 500 }}>
                {#each findResults as { profileId, following, followers, avatar, isFollower, isPrivate, isSelf }, i}
                    <div on:click={() => viewProfile(i)}>
                        <img
                            id="avatar"
                            src={avatar
                                ? avatar
                                : 'https://fronvo.herokuapp.com/svgs/profile/default.svg'}
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

        <button
            id="close"
            on:click={() => {
                $modalVisible = false;
            }}>Close</button
        >
    {:else}
        <Loading text="Loading..." />
    {/if}
</div>

<style>
    hr {
        width: 100px;
    }

    .find-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
    }

    .header-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 20px;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .header-container #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    .header-container input {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 95%;
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

    .find-items-container div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--nav_bg_color);
        box-shadow: 0 0 10px var(--nav_shadow_color);
        width: 350px;
        height: min-content;
        border-radius: 10px;
        padding: 10px;
        margin-right: 25px;
        margin-bottom: 20px;
        transition: 250ms background;
        cursor: pointer;
        background-size: 200% auto;
        background-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 1%) 0%,
            rgba(146, 73, 255, 20%) 51%,
            rgba(0, 0, 0, 1%) 100%
        );
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

    #close {
        font-size: 2.2rem;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

        .header-container #error-header {
            font-size: 1.7rem;
        }

        .header-container input {
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
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: default;
        }

        .find-items-container div:first-child {
            padding-top: 0;
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

        #close {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        .header-container #error-header {
            font-size: 1.4rem;
        }

        .header-container input {
            font-size: 1.4rem;
        }

        .find-items-container div {
            width: 280px;
            margin-right: 0;
            margin-bottom: 10px;
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

        #close {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
