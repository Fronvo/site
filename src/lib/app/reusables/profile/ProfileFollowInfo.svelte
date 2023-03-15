<script lang="ts">
    import { guestMode } from 'stores/main';
    import {
        followModalForFollowing,
        followModalInfo,
        ModalTypes,
    } from 'stores/modals';
    import { showModal } from 'utilities/main';

    export let accessible: boolean;
    export let followers: string[];
    export let following: string[];

    function showFollowInfo(followInfo: string[], forFollowing: boolean): void {
        // Custom clients can use fetchProfileDataGuest to load follow info
        // We won't, disable manually
        if ($guestMode) {
            showModal(ModalTypes.JoinFronvo);
            return;
        }

        if (!accessible || followInfo.length == 0) return;

        $followModalInfo = followInfo;
        $followModalForFollowing = forFollowing;

        showModal(ModalTypes.FollowInfo);
    }

    function formatFollowInfo(followInfo: number): string {
        // 100 -> 100
        // 1000 -> 1k
        // 1100 -> 1k
        // 1000000 -> 1m

        if (!accessible) return '?';

        if (followInfo / 1000000 >= 1) {
            return `${Math.floor(followInfo / 1000000)}m`;
        } else if (followInfo / 1000 >= 1) {
            return `${Math.floor(followInfo / 1000)}k`;
        } else {
            return `${followInfo}`;
        }
    }
</script>

<div class="follow-container">
    <h1 id="followers" on:click={() => showFollowInfo(followers, false)}>
        <span>{formatFollowInfo(followers.length)}</span> followers
    </h1>

    <h1 id="following" on:click={() => showFollowInfo(following, true)}>
        <span>{formatFollowInfo(following.length)}</span> following
    </h1>
</div>

<style>
    .follow-container {
        display: flex;
        flex-wrap: nowrap;
        margin-top: 5px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .follow-container h1 {
        cursor: pointer;
        font-size: 1.5rem;
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: 250ms;
    }

    .follow-container h1:hover {
        text-decoration: underline;
    }

    .follow-container #followers {
        margin-right: 15px;
    }

    .follow-container h1 span {
        color: var(--profile_info_color);
    }

    @media screen and (max-width: 850px) {
        .follow-container {
            margin-top: 5px;
            margin-left: 25px;
        }

        .follow-container h1 {
            font-size: 1.1rem;
            cursor: default;
        }

        .follow-container #followers {
            margin-right: 10px;
        }
    }
</style>
