// ******************** //
// Interfaces for the sendPost event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface SendPostParams {
    profileId: string;
    postId: string;
}

export interface SendPostResult extends FronvoError {}
