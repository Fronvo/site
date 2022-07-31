// ******************** //
// Interfaces for the deletePost event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface DeletePostParams {
    postId: string;
}

export interface DeletePostResult extends FronvoError {}
