// ******************** //
// Reusable functions for the app communities panel.
// ******************** //

import {
    initialCommunityLoadingFinished,
    joinedCommunity,
    officialCommunity,
    ourProfileData,
    targetCommunity,
    targetCommunityData,
} from 'stores/app/communities';
import { socket } from 'stores/global';
import { fetchUser } from './main';

export async function loadCommunitiesPanel(
    targetCommunityId?: string
): Promise<void> {
    return new Promise(async (resolve) => {
        joinedCommunity.set(undefined);
        officialCommunity.set(undefined);
        initialCommunityLoadingFinished.set(false);

        const accountData = await fetchUser();

        if (accountData.isSelf) {
            ourProfileData.set(accountData);
        }

        // Load official / joined community
        if (!accountData.isInCommunity) {
            socket.emit(
                'fetchCommunityData',
                {
                    communityId: targetCommunityId || 'fronvo',
                },
                ({ communityData, err }) => {
                    if (!err) {
                        if (targetCommunityId) {
                            targetCommunityData.set(communityData);
                        } else {
                            officialCommunity.set(communityData);
                        }
                    } else {
                        targetCommunity.set(undefined);
                        targetCommunityData.set(undefined);

                        socket.emit(
                            'fetchCommunityData',
                            {
                                communityId: 'fronvo',
                            },
                            ({ communityData }) => {
                                officialCommunity.set(communityData);
                            }
                        );
                    }

                    resolve();
                }
            );
        } else {
            socket.emit(
                'fetchCommunityData',
                { communityId: accountData.communityId },
                ({ communityData, err }) => {
                    !err && joinedCommunity.set(communityData);

                    resolve();
                }
            );
        }
    });
}
