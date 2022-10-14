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
        class="svg"
        d="M11.7 35.3q3-1.9 5.9-2.9 2.9-1 6.4-1 3.5 0 6.4 1 2.9 1 5.95 2.9 2.2-2.5 3.25-5.3 1.05-2.8 1.05-6 0-7.05-4.8-11.85T24 7.35q-7.05 0-11.85 4.8T7.35 24q0 3.2 1.075 6t3.275 5.3ZM24 25.1q-2.7 0-4.525-1.825-1.825-1.825-1.825-4.525t1.825-4.525Q21.3 12.4 24 12.4t4.525 1.825q1.825 1.825 1.825 4.525t-1.825 4.525Q26.7 25.1 24 25.1Zm0 17.75q-3.9 0-7.375-1.5t-6-4.05q-2.525-2.55-4-5.975T5.15 24q0-3.95 1.5-7.375t4.05-5.975q2.55-2.55 5.975-4.025Q20.1 5.15 24 5.15q3.95 0 7.375 1.475t5.975 4.025q2.55 2.55 4.025 6Q42.85 20.1 42.85 24q0 3.9-1.475 7.325Q39.9 34.75 37.35 37.3q-2.55 2.55-6 4.05T24 42.85Z"
    /></svg
>

<style>
    svg {
        margin-bottom: 15px;
    }

    @media screen and (max-width: 720px) {
        svg {
            margin-bottom: 0;
            margin-right: 20px;
        }
    }

    @media screen and (max-width: 520px) {
        svg {
            margin-right: 10px;
        }
    }
</style>
