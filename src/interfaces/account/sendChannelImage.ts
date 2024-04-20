// ******************** //
// Interfaces for the sendChannelImage event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface SendChannelImageParams {
    serverId: string;
    channelId: string;
    attachment: string;
    width: number;
    height: number;
}

export interface SendChannelImageResult extends FronvoError {}
