// ******************** //
// Interfaces for the deleteChannelMessage event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface DeleteChannelMessageParams {
    serverId: string;
    channelId: string;
    messageId: string;
}

export interface DeleteChannelMessageResult extends FronvoError {}
