// ******************** //
// Interfaces for the createPost event file.
// ******************** //

import type { AccountPost, FronvoError } from 'interfaces/all';

export interface CreatePostParams {
    title: string;
    content: string;
    attachment?: string;
}

export interface CreatePostResult extends FronvoError {
    postData: AccountPost;
}
