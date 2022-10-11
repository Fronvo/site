<script lang="ts">
    import { fetchUser } from 'utilities/app/main';
    import { userData } from 'src/stores/app/profile';
    import { socket } from 'src/stores/global';
    import { homePosts } from 'src/stores/app/home';
    import { ourProfileData } from 'src/stores/app/communities';

    let isFollowed = $ourProfileData.following.includes($userData.profileId);
    let isRequesting = false;

    async function handleFollowProfile(): Promise<void> {
        if (isRequesting) return;

        // Block adjacent requests
        isRequesting = true;

        if (!isFollowed) {
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

            // Reset home posts
            homePosts.set(undefined);
        }

        // Illusion of no delay
        isFollowed = !isFollowed;
    }
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={handleFollowProfile}
    ><defs
        ><linearGradient
            id="FOLLOW"
            gradientUnits="userSpaceOnUse"
        /><linearGradient
            id="follow"
            x1="47"
            y1="9.6"
            x2="1"
            y2="38.4"
            href="#FOLLOW"
            ><stop stop-color="#b98bff" /><stop
                offset="1"
                stop-color="#710fff"
            /></linearGradient
        ></defs
    ><style>
        .follow {
            fill: url(#follow);
            stroke-width: 0;
        }
    </style><path
        class="follow"
        d={!isFollowed
            ? 'M36.45 27.9v-6.45H30V18.6h6.45v-6.45h2.9v6.45h6.45v2.85h-6.45v6.45Zm-18.4-3.95q-3.3 0-5.35-2.025T10.65 16.6q0-3.3 2.05-5.35T18 9.2q3.3 0 5.35 2.05t2.05 5.35q0 3.25-2.05 5.3t-5.3 2.05Zm-15.8 15.7V35.1q0-1.7.875-3.1Q4 30.6 5.6 29.95q3.75-1.65 6.6-2.325 2.85-.675 5.8-.675 3 0 5.825.675T30.4 29.9q1.65.75 2.525 2.125t.875 3.125v4.5Zm2.9-2.85h25.8v-1.65q0-.85-.45-1.575T29.3 32.5q-3.55-1.65-5.975-2.175Q20.9 29.8 18.05 29.8q-2.9 0-5.325.525Q10.3 30.85 6.75 32.5q-.75.35-1.175 1.075-.425.725-.425 1.525Zm12.9-15.7q1.95 0 3.225-1.275Q22.55 18.55 22.55 16.6q0-1.95-1.275-3.225Q20 12.1 18.05 12.1q-1.95 0-3.225 1.275Q13.55 14.65 13.55 16.6q0 1.95 1.275 3.225Q16.1 21.1 18.05 21.1Zm0-4.5Zm0 20.2Z'
            : 'm39.45 44.9-5.65-5.65v.45H2.25v-4.6q0-1.7.9-3.1.9-1.4 2.45-2.05 3.65-1.7 6.55-2.35 2.9-.65 5.85-.65 1.05 0 1.95.05.9.05 1.8.2l-3.2-3.2h-.5q-3.3 0-5.35-2.05t-2.05-5.35v-.55L2.4 7.8l2-2 37.05 37.1Zm-3-17v-6.45H30V18.6h6.45v-6.45h2.9v6.45h6.45v2.85h-6.45v6.45Zm-12.5-6.6-2.1-2.1q.35-.65.525-1.275.175-.625.175-1.325 0-1.95-1.275-3.225Q20 12.1 18.05 12.1q-.8 0-1.45.175-.65.175-1.2.475l-2.05-2.05q.85-.7 2.1-1.1 1.25-.4 2.6-.4 3.25 0 5.3 2.05t2.05 5.35q0 1.4-.4 2.6-.4 1.2-1.05 2.1ZM5.15 36.85h25.8l-5.6-5.95q-1.7-.6-3.425-.85Q20.2 29.8 18 29.8q-2.75 0-5.225.5-2.475.5-6.025 2.2-.75.4-1.175 1.1-.425.7-.425 1.55Zm16.7-17.65Zm-3.8 17.65Z'}
    /></svg
>

<style>
    svg {
        cursor: pointer;
        transition: 100ms transform;
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
