import type { Community, FronvoAccount } from 'interfaces/all';
import {
    chatRequestAccepted,
    communityData,
    communityMessages as messages,
} from 'stores/community';
import { socket } from 'stores/main';
import { getKey } from './global';

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

export async function loadCommunitiesData(
    ourData: FronvoAccount
): Promise<void> {
    communityData.set(undefined);
    messages.set([]);
    chatRequestAccepted.set(undefined);

    if (!getKey('token')) {
        return;
    }

    // If not in a community, return
    if (!ourData.isInCommunity) return;

    // Otherwise, load the joined community
    await loadJoinedCommunity(ourData);
}

async function loadJoinedCommunity(ourData: FronvoAccount): Promise<Community> {
    const data = await fetchCommunity(ourData.communityId);

    communityData.set(data);

    loadRequestStatus();

    await loadCommunityMessages();

    return data;

    function loadRequestStatus(): void {
        chatRequestAccepted.set(
            data.acceptedChatRequests.includes(ourData.profileId)
        );
    }

    async function loadCommunityMessages(): Promise<void> {
        return new Promise((resolve) => {
            socket.emit(
                'fetchCommunityMessages',
                {
                    from: '0',
                    to: '40',
                },
                ({ communityMessages }) => {
                    messages.set(communityMessages.reverse());

                    resolve();
                }
            );
        });
    }
}
