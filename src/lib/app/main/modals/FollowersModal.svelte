<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import Loading from '$lib/app/Loading.svelte';
    import type { FronvoAccount } from 'interfaces/app/main';
    import {
        followersModalInfo,
        followingModalInfo,
        modalVisible,
    } from 'stores/app/main';
    import { fetchUser } from 'utilities/app/main';

    let followers: FronvoAccount[] = [];
    let loadingFinished = false;

    async function loadFollowers() {
        // Fetch all followers, notify UI once finished

        // Sanity check for new accounts, new UI will be displayed
        if ($followingModalInfo.length == 0) {
            loadingFinished = true;
            return;
        }

        // Some followers exist, fetch them
        for (const followerIndex in $followersModalInfo) {
            fetchUser($followersModalInfo[followerIndex]).then((follower) => {
                followers.push(follower);

                // Finish loading
                if (followers.length == $followersModalInfo.length) {
                    loadingFinished = true;
                }
            });
        }
    }

    $: loadFollowers();
</script>

<div class="followers-container">
    <div class="header-container">
        <h1 id="header"><span>{$followersModalInfo.length}</span> Followers</h1>
    </div>

    <hr />

    {#if loadingFinished}
        {#if followers.length == 0}
            <Center>
                <h1 id="no-followers">No followers</h1>
            </Center>
        {:else}
            <div class="followers-items-container">
                {#each followers as { username, following, followers }}
                    <div>
                        <img
                            id="avatar"
                            src="svgs/profile/default.svg"
                            alt={`${username}'s avatar`}
                            draggable={false}
                        />
                        <h1 id="username">{username}</h1>
                        <h1 id="following">
                            <span>{following.length}</span> following
                        </h1>
                        <h1 id="followers">
                            <span>{followers.length}</span> followers
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

    .followers-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 20px;
    }

    .header-container #header span {
        color: var(--theme-profile_info_color);
    }

    .followers-items-container {
        display: flex;
        justify-content: center;
        padding: 15px;
        overflow-y: auto;
        flex-wrap: wrap;
    }

    .followers-items-container div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--theme-nav_bg_color);
        box-shadow: 0 0 10px var(--theme-nav_shadow_color);
        width: 350px;
        border-radius: 10px;
        padding: 10px;
        margin-right: 25px;
        margin-bottom: 20px;
        transition: 300ms transform;
    }

    .followers-items-container div:hover {
        transform: scale(1.02);
    }

    .followers-items-container div h1 {
        margin: 0;
    }

    .followers-items-container div h1 span {
        color: var(--theme-profile_info_color);
    }

    .followers-items-container div #username {
        font-size: 2.5rem;
        color: var(--theme-profile_info_color);
        cursor: pointer;
    }

    .followers-items-container div #following,
    .followers-items-container div #followers {
        font-size: 2.1rem;
    }

    .followers-items-container div #avatar {
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

    #no-followers {
        font-size: 2.3rem;
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

        .followers-items-container div {
            width: 300px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            margin-right: 10px;
            margin-bottom: 10px;
        }

        .followers-items-container div:first-child {
            padding-top: 0;
        }

        .followers-items-container div:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .followers-items-container div:hover {
            transform: scale(1);
        }

        .followers-items-container div #username {
            font-size: 1.7rem;
            cursor: default;
        }

        .followers-items-container div #following,
        .followers-items-container div #followers {
            display: none;
        }

        .followers-items-container div #avatar {
            width: 64px;
            height: 64px;
            margin-right: 5px;
        }

        #no-followers {
            font-size: 2rem;
        }

        #close {
            font-size: 1.8rem;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        .followers-items-container div {
            width: 280px;
            margin-right: 0;
            margin-bottom: 10px;
            padding: 5px;
        }

        .followers-items-container div #username {
            font-size: 1.7rem;
        }

        .followers-items-container div #following,
        .followers-items-container div #followers {
            font-size: 1.7rem;
        }

        #no-followers {
            font-size: 1.7rem;
        }

        #close {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
