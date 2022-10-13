// ******************** //
// Interfaces for the fetchProfilePosts event file.
// ******************** //

import type { AccountPost, FronvoError } from 'interfaces/all';

export interface FetchProfilePostsParams {
    profileId: string;
    from: string;
    to: string;
}

export interface FetchProfilePostsResult extends FronvoError {
    profilePosts: AccountPost[];
}
