// ******************** //
// Interfaces for the likePost event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface LikePostParams {
    postId: string;
}

export interface LikePostResult extends FronvoError {}
