// ******************** //
// Interfaces for the newMessage event.
// ******************** //

import type { FetchedMessage } from './fetchMessages';

export interface NewMessageResult {
    roomId: string;
    newMessageData: FetchedMessage;
}
