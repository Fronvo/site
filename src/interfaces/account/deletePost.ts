// ******************** //
// Interfaces for the deletePost event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface DeletePostParams {
    postId: string;
}

export interface DeletePostResult extends FronvoError {}
