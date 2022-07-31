// ******************** //
// Reusable functions for the app profile panel.
// ******************** //

import { userData, userPosts } from 'stores/app/profile';
import { fetchPosts, fetchUser } from 'utilities/app/main';

export async function loadProfileData(targetProfile: string): Promise<void> {
    userData.set(await fetchUser(targetProfile));
}

export async function loadProfilePosts(targetProfile: string): Promise<void> {
    // Initial to 5 posts loaded
    userPosts.set((await fetchPosts(targetProfile, '0', '5')).reverse());
}
