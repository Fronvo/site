// ******************** //
// Interfaces for the regenerateServerInvite event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface RegenerateServerInviteParams {
    serverId: string;
}

export interface RegenerateServerInviteResult extends FronvoError {}
