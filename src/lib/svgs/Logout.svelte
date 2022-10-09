<script lang="ts">
    import { quadIn } from 'svelte/easing';
    import { draw } from 'svelte/transition';
    import { socket } from 'src/stores/global';
    import { removeKey } from 'src/utilities/global';
    import { accountRegisterVerifyTab } from 'src/stores/app/account';
    import {
        initialCommunityLoadingFinished,
        joinedCommunity,
        sendContent,
        targetCommunity,
        targetCommunityData,
        targetCommunityMessages,
    } from 'src/stores/app/communities';
    import { homePosts } from 'src/stores/app/home';
    import { targetProfile, userData } from 'src/stores/app/profile';
    import { loginSucceeded } from 'src/stores/app/main';

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
    ><defs
        ><linearGradient
            id="LOGOUT"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="logout"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#LOGOUT"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .logout {
            fill: url(#logout);
            stroke-width: 0;
        }
    </style><path
        in:draw={{ duration: 1000, easing: quadIn }}
        class="logout"
        d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z"
    /></svg
>

<style>
    svg {
        fill: none;
        stroke: var(--svg_stroke);
        stroke-width: 2px;
        cursor: pointer;
        transition: 100ms all;
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
            margin-bottom: 0;
            margin-top: 0;
            margin-right: 20px;
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
            margin-right: 10px;
        }
    }
</style>
