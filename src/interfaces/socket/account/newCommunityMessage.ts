// ******************** //
// Interfaces for the newCommunityMessage event.
// ******************** //

import type { CommunityMessage } from 'interfaces/app/communities';

export interface NewCommunityMessageResult {
    newMessageData: CommunityMessage;
}
