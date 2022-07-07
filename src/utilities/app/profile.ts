// ******************** //
// Reusable functions for the app friends panel.
// ******************** //

import { friendRequests, friendsAdded, userData } from 'stores/app/profile';
import { fetchUser } from 'utilities/app/main';

export function loadProfilePanel(): void {
    loadUserData();
    loadFriendsAdded();
    loadFriendRequests();
}

async function loadUserData(): Promise<void> {
    userData.set(await fetchUser());
}

function loadFriendsAdded(): void {
    // TODO: Fetch
    friendsAdded.set([]);
}

function loadFriendRequests(): void {
    // TODO: Fetch
    friendRequests.set([]);
}
