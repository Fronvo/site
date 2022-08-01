<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import Loading from '$lib/app/Loading.svelte';
    import type { FronvoAccount } from 'interfaces/app/main';
    import { followingModalInfo, modalVisible } from 'stores/app/main';
    import { fetchUser } from 'utilities/app/main';

    let following: FronvoAccount[] = [];
    let loadingFinished = false;

    async function loadFollowing() {
        // Fetch all followed users, notify UI once finished

        // Sanity check for new accounts, new UI will be displayed
        if ($followingModalInfo.length == 0) {
            loadingFinished = true;
            return;
        }

        // Some followed users exist, fetch them
        for (const followingIndex in $followingModalInfo) {
            fetchUser($followingModalInfo[followingIndex]).then(
                (followingUser) => {
                    following.push(followingUser);

                    // Finish loading
                    if (following.length == $followingModalInfo.length) {
                        loadingFinished = true;
                    }
                }
            );
        }
    }

    $: loadFollowing();
</script>

<div class="following-container">
    <div class="header-container">
        <h1 id="header"><span>{$followingModalInfo.length}</span> Following</h1>
    </div>

    <hr />

    {#if loadingFinished}
        {#if following.length == 0}
            <Center>
                <h1 id="no-followed">No followed users</h1>
            </Center>
        {:else}
            <div class="following-items-container">
                {#each following as { username, following, followers, avatar }}
                    <div>
                        <img
                            id="avatar"
                            src={avatar
                                ? avatar
                                : 'https://fronvo.herokuapp.com/svgs/profile/default.svg'}
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

    .following-container {
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
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .header-container #header span {
        color: var(--theme-profile_info_color);
    }

    .following-items-container {
        display: flex;
        justify-content: center;
        padding: 15px;
        overflow-y: auto;
        flex-wrap: wrap;
    }

    .following-items-container div {
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

    .following-items-container div:hover {
        transform: scale(1.02);
    }

    .following-items-container div h1 {
        margin: 0;
    }

    .following-items-container div h1 span {
        color: var(--theme-profile_info_color);
    }

    .following-items-container div #username {
        font-size: 2.5rem;
        color: var(--theme-profile_info_color);
        cursor: pointer;
    }

    .following-items-container div #following,
    .following-items-container div #followers {
        font-size: 2.1rem;
    }

    .following-items-container div #avatar {
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

    #no-followed {
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

        .following-items-container div {
            width: 300px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            margin-right: 10px;
            margin-bottom: 10px;
        }

        .following-items-container div:first-child {
            padding-top: 0;
        }

        .following-items-container div:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .following-items-container div:hover {
            transform: scale(1);
        }

        .following-items-container div #username {
            font-size: 1.7rem;
            cursor: default;
        }

        .following-items-container div #following,
        .following-items-container div #followers {
            display: none;
        }

        .following-items-container div #avatar {
            width: 64px;
            height: 64px;
            margin-right: 5px;
        }

        #no-followed {
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

        .following-items-container div {
            width: 280px;
            margin-right: 0;
            margin-bottom: 10px;
            padding: 5px;
        }

        .following-items-container div #username {
            font-size: 1.7rem;
        }

        .following-items-container div #following,
        .following-items-container div #followers {
            font-size: 1.7rem;
        }

        #no-followed {
            font-size: 1.7rem;
        }

        #close {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
