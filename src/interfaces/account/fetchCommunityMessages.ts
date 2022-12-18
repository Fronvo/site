// ******************** //
// Interfaces for the fetchCommunityMessages event file.
// ******************** //

import type { CommunityMessage, FronvoError } from 'interfaces/all';

export interface FetchCommunityMessagesParams {
    from: string;
    to: string;
}

export interface FetchCommunityMessagesResult extends FronvoError {
    communityMessages: CommunityMessage[];
}
