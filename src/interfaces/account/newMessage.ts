// ******************** //
// Interfaces for the newMessage event.
// ******************** //

import type { RoomMessage, FronvoAccount } from 'interfaces/all';

export interface NewMessageResult {
    roomId: string;
    newMessageData: { message: RoomMessage; profileData: FronvoAccount };
}
