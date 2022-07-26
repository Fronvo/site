// ******************** //
// Interfaces for the createPost event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface CreatePostParams {
    title: string;
    content: string;
}

export interface CreatePostResult extends FronvoError {
    title: string;
    content: string;
    creationDate: string;
}
