<script lang="ts">
    import type { FronvoAccount } from 'interfaces/app/main';
    import { followersModalInfo, followingModalInfo } from 'stores/app/main';
    import { fade } from 'svelte/transition';
    import { showModal } from 'utilities/app/main';

    export let info: FronvoAccount;

    function showFollowing(): void {
        $followingModalInfo = info.following;
        showModal('Following');
    }

    function showFollowers(): void {
        $followersModalInfo = info.followers;
        showModal('Followers');
    }
</script>

{#if info}
    <div class="info-container">
        <!-- Avatar, username -->

        <!-- TODO: Pfp url check once implemented server-side -->
        <img
            id="avatar"
            src="svgs/profile/default.svg"
            alt={`${info.username}\'s avatar`}
            draggable={false}
        />

        <h1 in:fade={{ duration: 300, delay: 400 }} id="username">
            {info.username}
        </h1>

        <!-- TODO: Bio?, status? -->

        <!-- Follow info -->
        <div class="follow-container">
            <h1
                on:click={showFollowing}
                in:fade={{ duration: 400, delay: 400 }}
            >
                <!-- TODO: Format to k, m, leave as is for modals -->
                <span>{info.following.length}</span> following
            </h1>

            <h1
                on:click={showFollowers}
                in:fade={{ duration: 400, delay: 400 }}
            >
                <!-- TODO: Format to k, m, leave as is for modals -->
                <span>{info.followers.length}</span> followers
            </h1>
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
        margin-left: 10px;
        color: var(--theme-profile_info_color);
    }

    .follow-container {
        display: flex;
        flex-wrap: nowrap;
        margin-top: 10px;
    }

    .follow-container h1 {
        cursor: pointer;
        font-size: 2.2rem;
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

    @media screen and (max-width: 720px) {
        .info-container #avatar {
            width: 120px;
            height: 120px;
        }

        .info-container #username {
            font-size: 2.6rem;
        }

        .follow-container {
            margin-top: 5px;
        }

        .follow-container h1 {
            font-size: 1.9rem;
            cursor: default;
        }

        .follow-container h1:first-child {
            margin-right: 15px;
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

        .follow-container h1 {
            font-size: 1.6rem;
        }

        .follow-container h1:first-child {
            margin-right: 10px;
        }
    }
</style>
