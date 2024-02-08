// ******************** //
// Interfaces for the sendChannelImage event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface SendChannelImageParams {
    serverId: string;
    channelId: string;
    attachment: string;
}

export interface SendChannelImageResult extends FronvoError {}
