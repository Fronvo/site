// ******************** //
// Interfaces for the newCommunityMessage event.
// ******************** //

import type { CommunityMessage, FronvoAccount } from 'interfaces/all';

export interface NewCommunityMessageResult {
    newMessageData: { message: CommunityMessage; profileData: FronvoAccount };
}
