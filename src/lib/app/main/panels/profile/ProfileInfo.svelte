<script lang="ts">
    import { followModalForFollowing, followModalInfo } from 'stores/app/main';
    import { userData } from 'stores/app/profile';
    import { socket } from 'stores/global';
    import { onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { fetchUser, showModal } from 'utilities/app/main';

    let isInFollowing = false;
    let isRequesting = false;
    const isAccessible =
        $userData.isFollower || $userData.isSelf || !$userData.isPrivate;

    // Once targetProfile changes to visit a new profile from this panel directly
    // update UI
    const unsubscribe = userData.subscribe(async (newProfile) => {
        if (!newProfile || newProfile.isSelf) return;

        // Update UI follow indicator and function
        isInFollowing = (await fetchUser()).following.includes(
            newProfile.profileId
        );
    });

    onDestroy(() => {
        // Prevent memory leak
        unsubscribe();
    });

    function showFollowInfo(followInfo: string[], forFollowing: boolean): void {
        if (!isAccessible) return;

        $followModalInfo = followInfo;
        $followModalForFollowing = forFollowing;
        showModal('FollowInfo');
    }

    function showEditProfile(): void {
        showModal('EditProfile');
    }

    function showCreatePost(): void {
        showModal('CreatePost');
    }

    function showFindProfiles(): void {
        showModal('FindProfiles');
    }

    function formatFollowInfo(followInfo: number): string {
        // 100 -> 100
        // 1000 -> 1k
        // 1100 -> 1k
        // 1000000 -> 1m

        if (!isAccessible) return '?';

        if (followInfo / 1000000 >= 1) {
            return `${Math.floor(followInfo / 1000000)}m`;
        } else if (followInfo / 1000 >= 1) {
            return `${Math.floor(followInfo / 1000)}k`;
        } else {
            return `${followInfo}`;
        }
    }

    function handleFollowProfile(): void {
        if (isRequesting) return;

        // Block adjacent requests
        isRequesting = true;

        if (!isInFollowing) {
            socket.emit(
                'followProfile',
                { profileId: $userData.profileId },
                ({ err }) => {
                    if (!err) {
                        reloadProfile();
                    }
                }
            );
        } else {
            socket.emit(
                'unfollowProfile',
                { profileId: $userData.profileId },
                ({ err }) => {
                    if (!err) {
                        reloadProfile();
                    }
                }
            );
        }

        async function reloadProfile(): Promise<void> {
            // Update follow counts
            $userData = await fetchUser($userData.profileId);

            isRequesting = false;
        }

        // Illusion of no delay
        isInFollowing = !isInFollowing;
    }
</script>

{#if $userData}
    <div class="info-container">
        <!-- Avatar, username -->

        <img
            id="avatar"
            src={$userData.avatar
                ? $userData.avatar
                : 'https://fronvo.herokuapp.com/svgs/profile/default.svg'}
            alt={`${$userData.username}\'s avatar`}
            draggable={false}
            in:fade={{ duration: 500 }}
        />

        <h1 id="username" in:fade={{ duration: 500 }}>
            {$userData.username}
        </h1>

        <h1 id="bio" in:fade={{ duration: 500 }}>
            {isAccessible ? $userData.bio : ''}
        </h1>

        <!-- Follow $userData -->
        <div class="follow-container" in:fade={{ duration: 300, delay: 300 }}>
            <h1 on:click={() => showFollowInfo($userData.following, true)}>
                <span>{formatFollowInfo($userData.following.length)}</span> following
            </h1>

            <h1 on:click={() => showFollowInfo($userData.followers, false)}>
                <span>{formatFollowInfo($userData.followers.length)}</span> followers
            </h1>
        </div>

        <div class="options-container" in:fade={{ duration: 300, delay: 250 }}>
            {#if $userData.isSelf}
                <button on:click={showEditProfile}>Edit profile</button>

                <button on:click={showCreatePost}>Create post</button>

                <button on:click={showFindProfiles}>Find profiles</button>
            {:else}
                <button on:click={handleFollowProfile}
                    >{isInFollowing ? 'Unfollow' : 'Follow'}</button
                >
            {/if}
        </div>
    </div>
{/if}

<style>
    .info-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .info-container #avatar {
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

    .info-container #username {
        font-size: 3rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        color: var(--theme-profile_info_color);
        text-align: center;
    }

    .info-container #bio {
        font-size: 1.7rem;
        margin: 0;
        margin-left: 10px;
        margin-right: 10px;
        color: var(--theme-profile_info_color);
        text-align: center;
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
    }

    .follow-container {
        display: flex;
        flex-wrap: nowrap;
        margin-top: 10px;
    }

    .follow-container h1 {
        cursor: pointer;
        font-size: 1.9rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .follow-container h1:first-child {
        margin-right: 20px;
    }

    .follow-container h1 span {
        color: var(--theme-profile_info_color);
    }

    .options-container {
        margin-top: 10px;
    }

    .options-container button {
        font-size: 1.7rem;
        margin-right: 10px;
    }

    .options-container button:nth-last-child(1) {
        margin-right: 0;
    }

    @media screen and (max-width: 720px) {
        .info-container #avatar {
            width: 120px;
            height: 120px;
        }

        .info-container #username {
            font-size: 2.6rem;
        }

        .info-container #bio {
            font-size: 1.5rem;
        }

        .follow-container {
            margin-top: 5px;
        }

        .follow-container h1 {
            font-size: 1.6rem;
            cursor: default;
        }

        .follow-container h1:first-child {
            margin-right: 15px;
        }

        .options-container button {
            font-size: 1.6rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .info-container #avatar {
            width: 100px;
            height: 100px;
        }

        .info-container #username {
            font-size: 2.1rem;
        }

        .info-container #bio {
            font-size: 1.2rem;
        }

        .follow-container h1 {
            font-size: 1.4rem;
        }

        .follow-container h1:first-child {
            margin-right: 10px;
        }

        .options-container button {
            font-size: 1.2rem;
            cursor: default;
        }
    }
</style>
