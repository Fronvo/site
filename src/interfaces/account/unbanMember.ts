// ******************** //
// Interfaces for the unbanMember event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface UnbanMemberParams {
    profileId: string;
}

export interface UnbanMemberResult extends FronvoError {}
