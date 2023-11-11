// ******************** //
// Interfaces for the newRoomMessage event.
// ******************** //

import type { RoomMessage, FronvoAccount } from 'interfaces/all';

export interface NewRoomMessageResult {
    roomId: string;
    newMessageData: { message: RoomMessage; profileData: FronvoAccount };
}
