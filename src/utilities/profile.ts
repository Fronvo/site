import { goto } from '$app/navigation';
import type { FronvoAccount } from 'interfaces/all';
import { socket } from 'stores/all';
import { ourProfileData } from 'stores/communities';
import {
    profileLoadingFinished,
    userCommunity,
    userData,
    userPosts,
} from 'stores/profile';
import { fetchPosts, fetchUser } from './main';

let userDataGlobal: FronvoAccount;

function setUserData(data: FronvoAccount): void {
    userData.set(data);
    userDataGlobal = data;
}

export async function loadProfilePanel(targetProfile?: string): Promise<void> {
    // Reset previous data
    profileLoadingFinished.set(false);
    setUserData(undefined);
    userPosts.set(undefined);
    userCommunity.set(undefined);

    // For follow relations and more
    await loadOurData();

    if (targetProfile) {
        await loadTargetProfile(targetProfile);
    } else {
        await loadProfile();
    }

    if (userDataGlobal.isInCommunity) {
        await loadProfileCommunity();
    }

    profileLoadingFinished.set(true);
}

async function loadOurData(): Promise<void> {
    const ourData = await fetchUser();

    ourProfileData.set(ourData);
    userDataGlobal = ourData;
}

async function loadProfile(): Promise<void> {
    setUserData(userDataGlobal);
    userPosts.set(await fetchPosts(userDataGlobal.profileId));

    // Didnt redirect before, no targetProfile
    goto(`/profile/${userDataGlobal.profileId}`, {
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
        await loadProfile();
        return;
    }

    setUserData(data);
    userPosts.set(await fetchPosts(data.profileId));
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
