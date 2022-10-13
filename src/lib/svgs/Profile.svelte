<script lang="ts">
    import { goto } from '$app/navigation';
    import { ourProfileData } from 'stores/communities';
    import {
        profileLoadingFinished,
        userCommunity,
        userData,
    } from 'stores/profile';
    import { socket } from 'stores/all';
    import { loadProfilePosts } from 'utilities/profile';
    import { currentPanelId } from 'stores/main';
    import { quadIn } from 'svelte/easing';
    import { draw } from 'svelte/transition';
    import { PanelTypes } from 'types/main';
    import { switchPanel } from 'utilities/main';

    async function decideProfileAction(): Promise<void> {
        if (
            $currentPanelId == PanelTypes.Profile &&
            $userData.profileId != $ourProfileData.profileId
        ) {
            goto(`/profile/${$ourProfileData.profileId}`, {
                replaceState: true,
            });
            $profileLoadingFinished = false;
            $userData = $ourProfileData;

            await loadProfilePosts($ourProfileData.profileId);

            if ($ourProfileData.isInCommunity) {
                socket.emit(
                    'fetchCommunityData',
                    { communityId: $userData.communityId },
                    ({ communityData, err }) => {
                        !err && userCommunity.set(communityData);

                        $profileLoadingFinished = true;
                    }
                );
            } else {
                $profileLoadingFinished = true;
            }
        } else {
            switchPanel(PanelTypes.Profile);
        }
    }
</script>

<svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48"
    height="48"
    on:click={decideProfileAction}
    ><path
        in:draw={{ duration: 1000, easing: quadIn }}
        class="svg"
        d="M11.1 35.25q3.15-2.2 6.25-3.375Q20.45 30.7 24 30.7q3.55 0 6.675 1.175t6.275 3.375q2.2-2.7 3.125-5.45Q41 27.05 41 24q0-7.25-4.875-12.125T24 7q-7.25 0-12.125 4.875T7 24q0 3.05.95 5.8t3.15 5.45ZM24 25.5q-2.9 0-4.875-1.975T17.15 18.65q0-2.9 1.975-4.875T24 11.8q2.9 0 4.875 1.975t1.975 4.875q0 2.9-1.975 4.875T24 25.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.775t4.3-6.35q2.725-2.725 6.375-4.3Q19.9 4 24 4q4.15 0 7.775 1.575t6.35 4.3q2.725 2.725 4.3 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.3 6.375-2.725 2.725-6.35 4.3Q28.15 44 24 44Zm0-3q2.75 0 5.375-.8t5.175-2.8q-2.55-1.8-5.2-2.75-2.65-.95-5.35-.95-2.7 0-5.35.95-2.65.95-5.2 2.75 2.55 2 5.175 2.8Q21.25 41 24 41Zm0-18.5q1.7 0 2.775-1.075t1.075-2.775q0-1.7-1.075-2.775T24 14.8q-1.7 0-2.775 1.075T20.15 18.65q0 1.7 1.075 2.775T24 22.5Zm0-3.85Zm0 18.7Z"
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
        margin-bottom: 15px;
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
