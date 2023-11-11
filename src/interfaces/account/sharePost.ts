// ******************** //
// Interfaces for the sharePost event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface SharePostParams {
    content?: string;
    attachment?: string;
    gif?: string;
}

export interface SharePostResult extends FronvoError {}
