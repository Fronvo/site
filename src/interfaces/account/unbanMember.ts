// ******************** //
// Interfaces for the unbanMember event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface UnbanMemberParams {
    serverId: string;
    profileId: string;
}

export interface UnbanMemberResult extends FronvoError {}
