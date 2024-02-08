// ******************** //
// Interfaces for the toggleServerInvites event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface ToggleServerInvitesParams {
    serverId: string;
}

export interface ToggleServerInvitesResult extends FronvoError {}
