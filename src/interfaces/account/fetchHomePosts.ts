// ******************** //
// Interfaces for the fetchHomePosts event file.
// ******************** //

import type { FronvoError, HomePost } from 'interfaces/all';

export interface FetchHomePostsParams {}

export interface FetchHomePostsResult extends FronvoError {
    homePosts: HomePost[];
}
