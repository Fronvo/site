// ******************** //
// Interfaces for the deleteCommunityMessage event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface DeleteCommunityMessageParams {
    messageId: string;
}

export interface DeleteCommunityMessageResult extends FronvoError {}
