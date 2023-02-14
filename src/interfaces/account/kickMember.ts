// ******************** //
// Interfaces for the kickMember event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface KickMemberParams {
    profileId: string;
}

export interface KickMemberResult extends FronvoError {}
