// ******************** //
// Reusable functions for the app profile panel.
// ******************** //

import { userPosts } from 'stores/profile';
import { fetchPosts } from './main';

export async function loadProfilePosts(targetProfile: string): Promise<void> {
    // Initial to 20 posts loaded
    userPosts.set((await fetchPosts(targetProfile, '0', '20'))?.reverse());
}
