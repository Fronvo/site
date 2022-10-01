// ******************** //
// Interfaces for the fetchHomePosts event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';
import type { HomePost } from 'interfaces/app/home';

export interface FetchHomePostsParams {}

export interface FetchHomePostsResult extends FronvoError {
    homePosts: HomePost[];
}
