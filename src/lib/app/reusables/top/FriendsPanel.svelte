<script lang="ts">
    import { onMount } from 'svelte';
    import AddFriendButton from '../side/AddFriendButton.svelte';
    import { ourData } from 'stores/profile';
    import {
        cachedAccountData,
        currentFriendsPanel,
        socket,
    } from 'stores/main';
    import type { FronvoAccount } from 'interfaces/all';
    import { findCachedAccount } from 'utilities/main';
    import Friend from './Friend.svelte';
    import { loadHomePosts } from 'utilities/home';

    // Default to all, ignore pending amount
    let activePanel = $currentFriendsPanel;
    let listVisible = true;

    let allElement: HTMLHeadingElement;
    let pendingElement: HTMLHeadingElement;

    let friendsInfo: FronvoAccount[] = [];
    let friendsLoadingFinished = false;

    let pendingInfo: FronvoAccount[] = [];
    let pendingLoadingFinished = false;

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

    async function loadPending(): Promise<void> {
        pendingInfo = [];

        if ($ourData.pendingFriendRequests.length == 0) {
            pendingLoadingFinished = true;
            return;
        }

        // Fetch all room members, notify UI once finished
        for (const pendingIndex in $ourData.pendingFriendRequests) {
            findCachedAccount(
                $ourData.pendingFriendRequests[pendingIndex],
                $cachedAccountData
            ).then((data) => {
                pendingInfo.push(data);

                checkLoadingDone();
            });
        }

        function checkLoadingDone(): void {
            // Finish loading
            if (pendingInfo.length == $ourData?.pendingFriendRequests.length) {
                pendingLoadingFinished = true;

                pendingInfo = pendingInfo;
            }
        }
    }

    function showAll(): void {
        activePanel = 0;
    }

    function showPending(): void {
        activePanel = 1;
    }

    onMount(() => {
        loadFriends();
        loadPending();

        socket.off('newFriendRequest');
        socket.off('pendingFriendRemoved');
        socket.off('friendAdded');
        socket.off('friendRemoved');

        // PENDING REQUESTS
        socket.on('newFriendRequest', ({ profileId }) => {
            pendingLoadingFinished = false;

            $ourData.pendingFriendRequests.push(profileId);
            $ourData = $ourData;

            pendingLoadingFinished = true;
            loadPending();
        });

        socket.on('pendingFriendRemoved', ({ profileId }) => {
            pendingLoadingFinished = false;

            $ourData.pendingFriendRequests.splice(
                $ourData.pendingFriendRequests.indexOf(profileId),
                1
            );
            $ourData = $ourData;

            pendingLoadingFinished = true;
            loadPending();
        });

        // FRIENDS
        socket.on('friendAdded', ({ profileId }) => {
            friendsLoadingFinished = false;

            $ourData.friends.push(profileId);
            $ourData = $ourData;

            friendsLoadingFinished = true;
            loadFriends();

            loadHomePosts();
        });

        socket.on('friendRemoved', ({ profileId }) => {
            friendsLoadingFinished = false;

            $ourData.friends.splice($ourData.friends.indexOf(profileId), 1);
            $ourData = $ourData;

            friendsLoadingFinished = true;
            loadFriends();

            loadHomePosts();
        });
    });
</script>

{#if listVisible}
    <div class="friends-container">
        <div class="wrapper">
            <h1
                class={`${activePanel == 0 ? 'active' : ''}`}
                bind:this={allElement}
                on:click={showAll}
                on:keydown={showAll}
            >
                Friends
            </h1>

            <div class="wrapper-v2">
                <h1
                    class={`${activePanel == 1 ? 'active' : ''}`}
                    bind:this={pendingElement}
                    on:click={showPending}
                    on:keydown={showPending}
                >
                    Pending
                </h1>

                {#if $ourData.pendingFriendRequests.length > 0}
                    <div class="notificator" />
                {/if}
            </div>
        </div>

        {#if activePanel == 0}
            {#if $ourData.friends.length == 0}
                <div class="empty">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        ><g fill="none"
                            ><path
                                stroke="var(--branding)"
                                stroke-linecap="round"
                                stroke-width="1.5"
                                d="M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1"
                            /><ellipse
                                cx="15"
                                cy="10.5"
                                fill="var(--branding)"
                                rx="1"
                                ry="1.5"
                            /><ellipse
                                cx="9"
                                cy="10.5"
                                fill="var(--branding)"
                                rx="1"
                                ry="1.5"
                            /><path
                                stroke="var(--branding)"
                                stroke-linecap="round"
                                stroke-width="1.5"
                                d="M22 14c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22m-4 0c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14m8-12C6.229 2 4.343 2 3.172 3.172C2 4.343 2 6.229 2 10m12-8c3.771 0 5.657 0 6.828 1.172C22 4.343 22 6.229 22 10"
                                opacity=".5"
                            /></g
                        ></svg
                    >
                    <h1>No friends added</h1>

                    <AddFriendButton />
                </div>
            {/if}

            <div class="panel-container">
                {#if friendsLoadingFinished && friendsInfo.length > 0}
                    {#each friendsInfo as profileData}
                        <Friend {profileData} />
                    {/each}

                    <AddFriendButton />
                {/if}
            </div>
        {:else}
            {#if $ourData.pendingFriendRequests.length == 0}
                <div class="empty">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        ><g
                            fill="var(--branding)"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            ><path
                                d="M12 2.75A9.25 9.25 0 0 1 21.25 12a.75.75 0 0 0 1.5 0c0-5.937-4.813-10.75-10.75-10.75a.75.75 0 0 0 0 1.5Zm0 5.5a.75.75 0 0 1 .75.75v3.25H16a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75V9a.75.75 0 0 1 .75-.75Z"
                            /><path
                                d="M9.1 2.398a.75.75 0 0 1-.43.97a9.187 9.187 0 0 0-.42.174a.75.75 0 1 1-.608-1.371c.16-.072.323-.139.488-.203a.75.75 0 0 1 .97.43ZM5.648 4.241a.75.75 0 0 1-.026 1.06c-.11.105-.217.212-.321.321a.75.75 0 1 1-1.087-1.034c.122-.127.246-.252.373-.373a.75.75 0 0 1 1.06.026ZM3.16 7.26a.75.75 0 0 1 .381.99c-.061.138-.12.278-.174.42a.75.75 0 0 1-1.399-.54c.063-.165.13-.328.202-.488a.75.75 0 0 1 .99-.381Zm-1.139 3.744a.75.75 0 0 1 .732.768a9.446 9.446 0 0 0 0 .456a.75.75 0 1 1-1.5.036a10.949 10.949 0 0 1 0-.529a.75.75 0 0 1 .768-.731ZM21.602 14.9a.75.75 0 0 1 .43.97c-.064.164-.13.327-.202.487a.75.75 0 1 1-1.371-.608c.061-.138.12-.278.174-.42a.75.75 0 0 1 .97-.429Zm-19.204 0a.75.75 0 0 1 .97.43c.054.141.112.28.173.419a.75.75 0 1 1-1.37.608a9.426 9.426 0 0 1-.203-.487a.75.75 0 0 1 .43-.97Zm17.362 3.452c.3.285.311.76.026 1.06a10.75 10.75 0 0 1-.373.373a.75.75 0 1 1-1.035-1.086c.11-.104.217-.212.321-.321a.75.75 0 0 1 1.06-.026Zm-15.52 0a.75.75 0 0 1 1.06.026c.105.11.212.216.322.32a.75.75 0 0 1-1.035 1.087a10.785 10.785 0 0 1-.373-.373a.75.75 0 0 1 .026-1.06Zm3.021 2.488a.75.75 0 0 1 .99-.382c.138.062.278.12.419.174a.75.75 0 0 1-.54 1.4a10.723 10.723 0 0 1-.488-.203a.75.75 0 0 1-.381-.99Zm9.478 0a.75.75 0 0 1-.381.99c-.16.07-.323.138-.488.202a.75.75 0 0 1-.54-1.4c.141-.054.281-.112.42-.174a.75.75 0 0 1 .989.382Zm-5.735 1.139a.75.75 0 0 1 .768-.732a9.606 9.606 0 0 0 .456 0a.75.75 0 0 1 .036 1.5a11.066 11.066 0 0 1-.528 0a.75.75 0 0 1-.732-.768Z"
                                opacity=".5"
                            /></g
                        ></svg
                    >
                    <h1 id="pending-empty">No pending requests</h1>
                </div>
            {/if}

            <div class="panel-container">
                {#if pendingLoadingFinished && pendingInfo.length > 0}
                    {#each pendingInfo as profileData}
                        <Friend {profileData} pending />
                    {/each}
                {/if}
            </div>
        {/if}
    </div>
{/if}

<style>
    .friends-container {
        width: 100%;
        position: fixed;
    }

    .wrapper {
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 275px;
    }

    .wrapper h1 {
        cursor: pointer;
        margin: 0;
        font-size: 1.2rem;
        width: 50%;
        flex: 1;
        border-radius: 10px;
        padding: 5px;
        margin-left: 5px;
        margin-right: 5px;
        text-align: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .wrapper h1:hover {
        background: var(--primary);
    }

    .indicator {
        display: flex;
        width: 35px;
        height: 3px;
        border-radius: 30px;
        background: var(--branding);
        margin-bottom: 5px;
    }

    .panel-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 5px;
    }

    .wrapper-v2 {
        display: flex;
        flex: 1;
    }

    .active {
        background: var(--primary);
    }

    .notificator {
        position: absolute;
        transform: translateX(97px) translateY(5px);
        width: 8px;
        height: 8px;
        background: var(--branding);
        box-shadow: 0 0 5px var(--branding);
        border-radius: 20px;
        pointer-events: none;
    }

    .empty {
        height: calc(100vh - 260px);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 275px;
        justify-content: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .empty h1 {
        margin: 0;
        font-size: 1.3rem;
        margin-bottom: 15px;
    }

    .empty svg {
        width: 128px;
        height: 128px;
        cursor: default;
    }

    #pending-empty {
        margin-bottom: 70px;
    }
</style>
