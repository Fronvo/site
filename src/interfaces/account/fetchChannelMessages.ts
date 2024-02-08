// ******************** //
// Interfaces for the fetchChannelMessages event file.
// ******************** //

import type { RoomMessage, FronvoAccount, FronvoError } from 'interfaces/all';

export interface FetchChannelMessagesParams {
    serverId: string;
    channelId: string;
    from: string;
    to: string;
}

export interface FetchChannelMessagesResult extends FronvoError {
    channelMessages: {
        message: RoomMessage;
        profileData: FronvoAccount;
    }[];
}
