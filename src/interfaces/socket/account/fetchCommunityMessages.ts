// ******************** //
// Interfaces for the fetchCommunityMessages event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';
import type { CommunityMessage } from 'interfaces/app/communities';

export interface FetchCommunityMessagesParams {}

export interface FetchCommunityMessagesResult extends FronvoError {
    communityMessages: CommunityMessage[];
}
