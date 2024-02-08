// ******************** //
// Interfaces for the createChannel event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface CreateChannelParams {
    serverId: string;
    name: string;
}

export interface CreateChannelResult extends FronvoError {}
