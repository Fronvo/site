<script lang="ts">
    import { socket } from 'stores/all';
    import { removeKey } from 'utilities/global';
    import { accountRegisterVerifyTab } from 'stores/account';
    import {
        initialCommunityLoadingFinished,
        joinedCommunity,
        sendContent,
        targetCommunity,
        targetCommunityData,
        targetCommunityMessages,
    } from 'stores/communities';
    import { homePosts } from 'stores/home';
    import { targetProfile, userData } from 'stores/profile';
    import { loginSucceeded } from 'stores/main';

    function logout(): void {
        socket.emit('logout', ({ err }) => {
            if (err) return;

            removeKey('token');
            $accountRegisterVerifyTab = false;
            $loginSucceeded = false;

            // Also reset userData, update smoothly on re-login
            $userData = undefined;
            $targetProfile = undefined;

            // And home posts
            $homePosts = undefined;

            // And communities
            $initialCommunityLoadingFinished = undefined;
            $joinedCommunity = undefined;
            $targetCommunity = undefined;
            $targetCommunityData = undefined;
            $sendContent = '';
            $targetCommunityMessages = undefined;
        });
    }
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={logout}
    ><path
        class="svg"
        d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z"
    /></svg
>

<style>
    svg {
        cursor: pointer;
        transition: 250ms all;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    svg:hover {
        opacity: 0.8;
    }

    svg:active {
        transform: scale(0.95);
    }

    @media screen and (max-width: 720px) {
        svg {
            cursor: default;
        }

        svg:hover {
            opacity: 1;
        }
    }

    @media screen and (max-width: 520px) {
        svg {
            width: 40px;
            height: 40px;
        }
    }
</style>
