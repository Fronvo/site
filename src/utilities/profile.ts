import { goto } from '$app/navigation';
import type { FronvoAccount } from 'interfaces/all';
import { PanelTypes } from 'stores/panels';
import {
    ourData,
    ourPosts,
    pendingSearchId,
    searchData,
    searchPosts,
} from 'stores/profile';
import { getKey } from './global';
import {
    fetchPosts,
    fetchUser,
    findCachedAccount,
    setProgressBar,
    switchPanel,
    updateCachedAccount,
} from './main';

export async function loadOurProfile(
    cachedData: FronvoAccount[]
): Promise<FronvoAccount> {
    if (!getKey('token')) return;

    const tempOurData = await fetchUser();

    // Force default value, we just want to cache our profile
    await updateCachedAccount(tempOurData.profileId, cachedData, tempOurData);

    ourData.set(tempOurData);
    ourPosts.set(await fetchPosts(tempOurData.profileId));

    return tempOurData;
}

export async function loadTargetProfile(
    profileId: string,
    cachedData: FronvoAccount[],
    preventReload?: boolean
): Promise<void> {
    // Will also create if not found in cache
    const data = await findCachedAccount(profileId, cachedData);

    // Invalid profile id
    if (!data) {
        pendingSearchId.set(undefined);

        goto('/home', {
            replaceState: true,
        });

        switchPanel(PanelTypes.Home);

        return;
    }

    setProgressBar(true);

    pendingSearchId.set(data.profileId);

    searchData.set(data);
    !preventReload && searchPosts.set(undefined);

    if (preventReload) {
        setProgressBar(false);
        return;
    }

    // Guest mode check
    if (data.totalPosts) {
        if (
            data.totalPosts != 0 ||
            !data.isPrivate ||
            data.isFollower ||
            data.isSelf
        ) {
            searchPosts.set(await fetchPosts(data.profileId));
        } else {
            searchPosts.set([]);
        }
    } else {
        searchPosts.set([]);
    }

    goto(`/@${data.profileId}`, {
        replaceState: true,
    });

    switchPanel(PanelTypes.Profile);

    setProgressBar(false);
}
