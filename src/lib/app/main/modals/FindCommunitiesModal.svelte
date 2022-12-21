<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import Loading from '$lib/app/Loading.svelte';
    import type { Community } from 'interfaces/all';
    import { modalAnimDuration } from 'stores/main';
    import { dataSaver, socket } from 'stores/all';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { dismissModal } from 'utilities/main';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import { onMount } from 'svelte';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    let searchValue: Writable<string> = writable('');
    let findResults: Community[] = [];
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

            loadingFinished = false;

            socket.emit(
                'findCommunities',
                { name: $searchValue, maxResults: '10' },
                ({ err, findResults }) => {
                    if (err) {
                        loadingFinished = true;
                    } else {
                        loadCommunities(findResults);
                    }
                }
            );
        }, 500);
    });

    function loadCommunities(targetIds: string[]): void {
        // Reset previous results
        findResults = [];

        // Should contain some id, none found otherwise
        if (targetIds.length > 0) {
            for (const idIndex in targetIds) {
                socket.emit(
                    'fetchCommunityData',
                    { communityId: targetIds[idIndex] },
                    ({ communityData }) => {
                        findResults.push(communityData);

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

    async function viewCommunity(communityIndex: number): Promise<void> {
        dismissModal();

        setTimeout(async () => {
            await loadCommunitiesPanel(findResults[communityIndex].communityId);
        }, modalAnimDuration);
    }

    onMount(() => {
        loadingFinished = true;
    });

    const data: ModalData = {
        title: 'Find communities',
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
                <h1 id="no-results" in:fade={{ duration: 300 }}>No results</h1>
            </Center>
        {:else}
            <div class="find-items-container" in:fade={{ duration: 500 }}>
                {#each findResults as { name, description, members, icon }, i}
                    <div on:click={() => viewCommunity(i)}>
                        <img
                            id="icon"
                            src={icon && !$dataSaver
                                ? icon
                                : '/svgs/profile/avatar.svg'}
                            alt={`${name} community's icon`}
                            draggable={false}
                        />
                        <h1 id="name">{name}</h1>
                        <h1 id="description">{description}</h1>
                        <h1 id="members">
                            <span>{members.length}</span>
                            member{members.length != 1 ? 's' : ''}
                        </h1>
                    </div>
                {/each}
            </div>
        {/if}
    {:else}
        <Loading text="Loading..." />
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

    .find-items-container div #name {
        font-size: 2.5rem;
        color: var(--profile_info_color);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .find-items-container div #description {
        text-align: center;
        color: var(--profile_info_color);
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .find-items-container div #members {
        font-size: 2.1rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .find-items-container div #icon {
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

    @media screen and (max-width: 720px) {
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

        .find-items-container div #name {
            font-size: 1.7rem;
            cursor: default;
        }

        .find-items-container div #description {
            display: none;
        }

        .find-items-container div #members {
            display: none;
        }

        .find-items-container div #icon {
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
            margin-right: 0;
            margin-bottom: 10px;
            padding: 5px;
        }

        .find-items-container div #name {
            font-size: 1.7rem;
        }

        .find-items-container div #members {
            font-size: 1.7rem;
        }

        #no-results {
            font-size: 1.7rem;
        }
    }
</style>
