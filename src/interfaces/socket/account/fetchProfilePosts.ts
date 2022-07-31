// ******************** //
// Interfaces for the fetchProfilePosts event file.
// ******************** //

import type { AccountPost } from 'interfaces/app/main';
import type { FronvoError } from 'interfaces/socket/all';

export interface FetchProfilePostsParams {
    profileId: string;
    from: string;
    to: string;
}

export interface FetchProfilePostsResult extends FronvoError {
    profilePosts: AccountPost[];
}
