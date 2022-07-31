// ******************** //
// Reusable functions for the app home panel.
// ******************** //

import type { HomePost } from 'interfaces/app/home';
import { homePosts } from 'stores/app/home';
import { fetchPosts, fetchUser } from 'utilities/app/main';

export async function loadHomePosts(): Promise<void> {
    const finalPosts: HomePost[] = [];

    const fronvoPosts = (await fetchPosts('fronvo', '0', '10')).reverse();
    const fronvoAccount = await fetchUser('fronvo');

    for (const postIndex in fronvoPosts) {
        finalPosts.push({
            post: fronvoPosts[postIndex],
            profileData: fronvoAccount,
        });
    }

    homePosts.set(finalPosts);
}
