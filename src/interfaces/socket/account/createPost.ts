// ******************** //
// Interfaces for the createPost event file.
// ******************** //

import type { AccountPost } from 'interfaces/app/main';
import type { FronvoError } from 'interfaces/socket/all';

export interface CreatePostParams {
    title: string;
    content: string;
    attachment?: string;
}

export interface CreatePostResult extends FronvoError {
    postData: AccountPost;
}
