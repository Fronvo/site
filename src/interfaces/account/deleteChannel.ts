// ******************** //
// Interfaces for the deleteChannel event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface DeleteChannelParams {
    serverId: string;
    channelId: string;
}

export interface DeleteChannelResult extends FronvoError {}
