// ******************** //
// Interfaces for the kickMember event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface KickMemberParams {
    serverId: string;
    profileId: string;
}

export interface KickMemberResult extends FronvoError {}
