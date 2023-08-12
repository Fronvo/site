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
    import { toast } from 'svelte-sonner';

    // Default to all, ignore pending amount
    let activePanel = $currentFriendsPanel;
    let listVisible = true;

    let allElement: HTMLHeadingElement;
    let pendingElement: HTMLHeadingElement;
    let indicator: HTMLDivElement;

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

    function moveIndicator(): void {
        $currentFriendsPanel = activePanel;

        if (activePanel == 0) {
            indicator.style.marginLeft = `${allElement.clientWidth / 2 - 15}px`;
        } else {
            indicator.style.marginLeft = `${
                allElement.clientWidth + pendingElement.clientWidth / 2 - 8
            }px`;
        }

        setTimeout(() => {
            indicator.style.transition =
                'all 200ms cubic-bezier(0.3, 1, 0.5, 1)';
        }, 150);
    }

    function showAll(): void {
        activePanel = 0;

        moveIndicator();
    }

    function showPending(): void {
        activePanel = 1;

        moveIndicator();
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

            toast(`@${profileId} wants to be your friend`);
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

            toast(`@${profileId} is now your friend`);
        });

        socket.on('friendRemoved', ({ profileId }) => {
            friendsLoadingFinished = false;

            $ourData.friends.splice($ourData.friends.indexOf(profileId), 1);
            $ourData = $ourData;

            friendsLoadingFinished = true;
            loadFriends();

            loadHomePosts();
        });

        if (!indicator) return;

        indicator.style.transition = 'none';

        moveIndicator();
    });
</script>

{#if listVisible}
    <div class="friends-container">
        <div class="wrapper">
            <h1 bind:this={allElement} on:click={showAll} on:keydown={showAll}>
                Friends
            </h1>

            <div class="wrapper-v2">
                <h1
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

        <div bind:this={indicator} class="indicator" />

        {#if activePanel == 0}
            {#if $ourData.friends.length == 0}
                <div class="empty">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        ><g fill="none"
                            ><circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="var(--branding)"
                                stroke-width="1.5"
                                opacity=".5"
                            /><path
                                stroke="var(--branding)"
                                stroke-linecap="round"
                                stroke-width="1.5"
                                d="M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1"
                            /><path
                                fill="var(--branding)"
                                d="M16 10.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5s.448-1.5 1-1.5s1 .672 1 1.5Z"
                            /><ellipse
                                cx="9"
                                cy="10.5"
                                fill="var(--branding)"
                                rx="1"
                                ry="1.5"
                            /></g
                        ></svg
                    >
                    <h1>No friends added</h1>
                </div>
            {/if}

            <AddFriendButton />

            <div class="panel-container">
                {#if friendsLoadingFinished && friendsInfo.length > 0}
                    {#each friendsInfo as profileData}
                        <Friend {profileData} />
                    {/each}
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
                            fill="none"
                            stroke="var(--branding)"
                            stroke-width="1.5"
                            ><circle cx="12" cy="12" r="10" opacity=".5" /><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 8v4l2.5 2.5"
                            /></g
                        ></svg
                    >
                    <h1>No pending requests</h1>
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
    }

    .wrapper-v2 {
        display: flex;
        flex: 1;
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
    }

    .empty svg {
        width: 128px;
        height: 128px;
        cursor: default;
    }
</style>
