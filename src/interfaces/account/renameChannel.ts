// ******************** //
// Interfaces for the renameChannel event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface RenameChannelParams {
    serverId: string;
    channelId: string;
    name: string;
}

export interface RenameChannelResult extends FronvoError {}
