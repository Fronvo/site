// ******************** //
// Interfaces for the fetchMessages event file.
// ******************** //

import type { RoomMessage, FronvoAccount, FronvoError } from 'interfaces/all';

export interface FetchMessagesParams {
    roomId: string;
    from: string;
    to: string;
}

export interface FetchMessagesResult extends FronvoError {
    roomMessages: {
        message: RoomMessage;
        profileData: FronvoAccount;
    }[];
}
