import { goto } from '$app/navigation';
import type { FronvoAccount } from 'interfaces/all';
import { socket } from 'stores/all';
import { currentPanelId } from 'stores/main';
import { ourProfileData } from 'stores/profile';
import {
    profileLoadingFinished,
    userCommunity,
    userData,
    userPosts,
} from 'stores/profile';
import { PanelTypes } from 'types/main';
import { getKey } from './global';
import { fetchPosts, fetchUser, setProgressBar } from './main';

let ourData: FronvoAccount;
let userDataGlobal: FronvoAccount;
let isLoading = false;
let lastTarget: string;
let guestMode = false;

function setUserData(data: FronvoAccount): void {
    userData.set(data);
    userDataGlobal = data;
}

export async function loadProfilePanel(targetProfile?: string): Promise<void> {
    setProgressBar(true);

    if (isLoading && targetProfile == lastTarget) return;

    isLoading = true;
    lastTarget = targetProfile;
    guestMode = !getKey('token');

    // Reset previous data
    profileLoadingFinished.set(false);
    setUserData(undefined);
    userPosts.set(undefined);
    userCommunity.set(undefined);

    // For follow relations and more
    !guestMode && (await loadOurData());

    if (targetProfile && targetProfile != ourData?.profileId) {
        await loadTargetProfile(targetProfile);
    } else {
        await loadProfile();
    }

    if (userDataGlobal.isInCommunity) {
        await loadProfileCommunity();
    }

    profileLoadingFinished.set(true);
    isLoading = false;

    setProgressBar(false);
}

export async function loadOurData(): Promise<FronvoAccount> {
    ourData = await fetchUser();

    ourProfileData.set(ourData);
    userDataGlobal = ourData;

    return ourData;
}

async function loadProfile(): Promise<void> {
    setUserData(ourData);
    userPosts.set(!guestMode && (await fetchPosts(ourData.profileId)));

    // Didnt redirect before, no targetProfile
    goto(`/profile/${ourData?.profileId}`, {
        replaceState: true,
    });
}

async function loadTargetProfile(targetProfile?: string): Promise<void> {
    // Redirect now
    goto(`/profile/${targetProfile}`, {
        replaceState: true,
    });

    const data = await fetchUser(targetProfile);

    // Abort if it doesnt exist
    if (!data) {
        if (guestMode) {
            // Redirect to Home
            currentPanelId.set(PanelTypes.Home);

            goto('/home', {
                replaceState: true,
            });

            return;
        }

        await loadProfile();
        return;
    }

    setUserData(data);
    userPosts.set(!guestMode && (await fetchPosts(data.profileId)));
}

async function loadProfileCommunity(): Promise<void> {
    return new Promise((resolve) => {
        socket.emit(
            'fetchCommunityData',
            { communityId: userDataGlobal.communityId },
            ({ communityData }) => {
                userCommunity.set(communityData);

                resolve();
            }
        );
    });
}
