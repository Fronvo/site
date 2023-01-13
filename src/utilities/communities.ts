// ******************** //
// Reusable functions for the app communities panel.
// ******************** //

import { goto } from '$app/navigation';
import type { Community, FronvoAccount } from 'interfaces/all';
import { socket } from 'stores/all';
import {
    chatRequestAccepted,
    communityLoadingFinished,
    officialCommunity as officialCommunityStore,
    joinedCommunity as joinedCommunityStore,
    targetCommunity as targetCommunityStore,
    targetCommunityData,
    targetCommunityMessages,
} from 'stores/communities';
import { setProgressBar } from './main';
import { loadOurData } from './profile';

let ourData: FronvoAccount;

export async function fetchCommunity(
    communityId: string
): Promise<Community | undefined> {
    return new Promise((resolve) => {
        socket.emit(
            'fetchCommunityData',
            {
                communityId,
            },
            ({ communityData, err }) => {
                if (err) {
                    resolve(undefined);
                    return;
                }

                resolve(communityData);
            }
        );
    });
}

export async function loadCommunitiesPanel(
    targetCommunity?: string
): Promise<void> {
    setProgressBar(true);

    communityLoadingFinished.set(false);
    officialCommunityStore.set(undefined);
    joinedCommunityStore.set(undefined);
    targetCommunityData.set(undefined);
    chatRequestAccepted.set(undefined);

    ourData = await loadOurData();

    // If not in a community, load the target community
    // Or the official one if that's empty
    if (!ourData.isInCommunity) {
        if (targetCommunity) {
            await loadTargetCommunity(targetCommunity);
        } else {
            await loadOfficialCommunity();
        }
    } else {
        // Load the joined community otherwise
        await loadJoinedCommunity(ourData.communityId);
    }

    communityLoadingFinished.set(true);
}

async function loadOfficialCommunity(): Promise<void> {
    goto('/community', {
        replaceState: true,
    });

    officialCommunityStore.set(await fetchCommunity('fronvo'));
}

async function loadTargetCommunity(targetCommunity?: string): Promise<void> {
    goto(`/community/${targetCommunity}`, {
        replaceState: true,
    });

    const targetData = await fetchCommunity(targetCommunity);

    // Abort if non-existent, load official community
    if (!targetData) {
        targetCommunityStore.set(undefined);
        await loadOfficialCommunity();
        return;
    }

    targetCommunityData.set(targetData);
}

async function loadJoinedCommunity(joinedCommunity?: string): Promise<void> {
    goto(`/community/${joinedCommunity}`, {
        replaceState: true,
    });

    const communityData = await fetchCommunity(joinedCommunity);

    joinedCommunityStore.set(communityData);

    // Update chat requests status
    loadRequestStatus();

    // Load the community messages aswell
    await loadCommunityMessages();

    function loadRequestStatus(): void {
        chatRequestAccepted.set(
            communityData.acceptedChatRequests.includes(ourData.profileId)
        );
    }

    async function loadCommunityMessages(): Promise<void> {
        return new Promise((resolve) => {
            socket.emit(
                'fetchCommunityMessages',
                {
                    from: '0',
                    to: '20',
                },
                ({ communityMessages }) => {
                    targetCommunityMessages.set(communityMessages);

                    resolve();
                }
            );
        });
    }
}
