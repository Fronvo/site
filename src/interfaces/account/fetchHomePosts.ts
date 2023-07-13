// ******************** //
// Interfaces for the fetchHomePosts event file.
// ******************** //

import type { FronvoError, Post } from 'interfaces/all';

export interface FetchHomePostsParams {
    from: string;
    to: string;
}

export interface FetchHomePostsResult extends FronvoError {
    totalPosts: number;
    homePosts: Post[];
}
