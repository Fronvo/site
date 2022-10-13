// ******************** //
// Interfaces for the fetchCommunityMessages event file.
// ******************** //

import type { CommunityMessage, FronvoError } from 'interfaces/all';

export interface FetchCommunityMessagesParams {}

export interface FetchCommunityMessagesResult extends FronvoError {
    communityMessages: CommunityMessage[];
}
