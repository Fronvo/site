// ******************** //
// Interfaces for the fetchHomePostsGuest event file.
// ******************** //

import type { FronvoError, HomePost } from 'interfaces/all';

export interface FetchHomePostsGuestParams {
    from: string;
    to: string;
}

export interface FetchHomePostsGuestResult extends FronvoError {
    totalPosts: number;
    homePosts: HomePost[];
}
