// ******************** //
// Interfaces for the fetchRoomMessages event file.
// ******************** //

import type { RoomMessage, FronvoAccount, FronvoError } from 'interfaces/all';

export interface FetchRoomMessagesParams {
    roomId: string;
    from: string;
    to: string;
}

export interface FetchRoomMessagesResult extends FronvoError {
    roomMessages: {
        message: RoomMessage;
        profileData: FronvoAccount;
    }[];
}
