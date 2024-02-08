// ******************** //
// Interfaces for the sendChannelMessage event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface SendChannelMessageParams {
    serverId: string;
    channelId: string;
    message?: string;
    replyId?: string;
}

export interface SendChannelMessageResult extends FronvoError {}
