// ******************** //
// Interfaces for the fetchProfilePosts event file.
// ******************** //

import type { FronvoError, Post } from 'interfaces/all';

export interface FetchProfilePostsParams {
    profileId: string;
    from: string;
    to: string;
}

export interface FetchProfilePostsResult extends FronvoError {
    totalPosts: number;
    profilePosts: Post[];
}
