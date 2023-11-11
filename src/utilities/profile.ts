import type { FronvoAccount } from 'interfaces/all';
import { ourData } from 'stores/profile';
import { fetchUser, updateCachedAccount } from './main';

export async function loadProfile(
    cachedData: FronvoAccount[]
): Promise<FronvoAccount> {
    const tempOurData = await fetchUser();

    // Force default value, we just want to cache our profile
    await updateCachedAccount(tempOurData.profileId, cachedData, tempOurData);

    ourData.set(tempOurData);

    await loadFriends(tempOurData, cachedData);
    await loadPendingFriends(tempOurData, cachedData);

    return tempOurData;
}

export async function loadFriends(
    ourData: FronvoAccount,
    cachedData: FronvoAccount[]
): Promise<void> {
    return new Promise(async (resolve) => {
        if (ourData.friends.length == 0) {
            resolve();
            return;
        }

        // Just put every friend in cache before finishing up
        const finishedReqs = [];

        for (const friendIndex in ourData.friends) {
            updateCachedAccount(ourData.friends[friendIndex], cachedData).then(
                () => {
                    finishedReqs.push(ourData.friends[friendIndex]);

                    checkLoadingDone();
                }
            );
        }

        function checkLoadingDone() {
            if (finishedReqs.length == ourData.friends.length) {
                resolve();
            }
        }
    });
}

export async function loadPendingFriends(
    ourData: FronvoAccount,
    cachedData: FronvoAccount[]
): Promise<void> {
    return new Promise(async (resolve) => {
        if (ourData.pendingFriendRequests.length == 0) {
            resolve();
            return;
        }

        const finishedReqs = [];

        // Same as above
        for (const pendingFriendIndex in ourData.pendingFriendRequests) {
            updateCachedAccount(
                ourData.pendingFriendRequests[pendingFriendIndex],
                cachedData
            ).then(() => {
                finishedReqs.push(
                    ourData.pendingFriendRequests[pendingFriendIndex]
                );
                checkLoadingDone();
            });
        }

        function checkLoadingDone() {
            if (finishedReqs.length == ourData.pendingFriendRequests.length) {
                resolve();
            }
        }
    });
}
