<script lang="ts">
    import { fade } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    import PropFriend from '$lib/app/reusables/dashboard/PropFriend.svelte';
    import Friend from '$lib/app/reusables/top/Friend.svelte';
    import { loadHomePosts } from 'utilities/dashboard';
    import { ourData } from 'stores/profile';
    import { cachedAccountData, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import { findCachedAccount, setTitle } from 'utilities/main';
    import type { FronvoAccount } from 'interfaces/all';

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

    onMount(() => {
        setTitle('Friends');

        loadFriends();

        socket.off('friendAdded');
        socket.off('friendRemoved');

        socket.on('friendAdded', ({ profileId }) => {
            friendsLoadingFinished = false;

            $ourData.friends.push(profileId);
            $ourData = $ourData;

            friendsLoadingFinished = true;
            loadFriends();

            loadHomePosts();

            socket.emit('createDM', {
                profileId,
            });
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

<div class="main-container" in:fade={{ duration: 200, easing: sineInOut }}>
    {#if friendsLoadingFinished && friendsInfo.length != 0}
        <h1 id="title">Friends</h1>

        <div class="friends-container">
            {#each friendsInfo as profileData}
                <Friend {profileData} />
            {/each}
        </div>
    {:else}
        <div class="empty">
            <div class="banner">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    ><path
                        d="M7 4.83c0 1.547 1.726 3.178 3.15 4.26c.799.606 1.198.91 1.85.91c.652 0 1.051-.304 1.85-.91C15.274 8.007 17 6.376 17 4.83c0-2.79-2.75-3.833-5-1.677C9.75.997 7 2.039 7 4.829Zm-.74 16.558H6c-.943 0-1.414 0-1.707-.293C4 20.803 4 20.332 4 19.389v-1.112c0-.518 0-.777.133-1.009c.133-.231.334-.348.736-.582c2.646-1.539 6.402-2.405 8.91-.91c.168.101.32.223.45.368a1.492 1.492 0 0 1-.126 2.134a.998.998 0 0 1-.427.24c.12-.014.235-.03.345-.047c.911-.145 1.676-.633 2.376-1.162l1.808-1.365a1.887 1.887 0 0 1 2.22 0c.573.433.749 1.146.386 1.728c-.423.678-1.019 1.545-1.591 2.075c-.573.53-1.426 1.004-2.122 1.34c-.772.373-1.624.587-2.491.728c-1.758.284-3.59.24-5.33-.118a15.031 15.031 0 0 0-3.017-.308Z"
                    /></svg
                >

                <h1>Your friends show up here!</h1>
            </div>

            <div class="props">
                {#each { length: 10 } as _, i}
                    <PropFriend opacity={1 - 0.95 + (1 - (i + 2.5) / 12.5)} />
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    h1 {
        margin: 0;
        font-size: 1.7rem;
        text-align: center;
        font-weight: 600;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: var(--text);
    }

    .main-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        margin: auto;
        width: 100%;
        height: calc(100vh);
        overflow-x: hidden;
        margin-top: 5px;
        padding-top: 10px;
    }

    .friends-container {
        flex-direction: column;
        overflow-y: auto;
        width: 350px;
        margin: auto;
        margin-top: 0;
        height: max-content;
        border-radius: 10px;
    }

    .friends-container::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .friends-container:hover.friends-container::-webkit-scrollbar-thumb {
        background: var(--tertiary);
    }

    #title {
        margin: auto;
        margin-bottom: 10px;
        margin-top: 0;
        font-size: 1.5rem;
    }

    .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        justify-content: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .banner {
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 7px;
        margin: 15px;
        margin-top: 0;
        padding-top: 0;
    }

    .banner h1 {
        margin: 0;
        font-size: 1.3rem;
        text-align: center;
    }

    .banner svg {
        width: 32px;
        height: 32px;
        fill: var(--text);
        margin-right: 10px;
    }

    .props {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>
