// ******************** //
// Interfaces for the sharePost event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface SharePostParams {
    attachment?: string;
}

export interface SharePostResult extends FronvoError {}
