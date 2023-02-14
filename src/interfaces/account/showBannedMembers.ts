// ******************** //
// Interfaces for the showBannedMembers event file.
// ******************** //

import type { FronvoAccount, FronvoError } from 'interfaces/all';

export interface ShowBannedMembersParams {}

export interface ShowBannedMembersResult extends FronvoError {
    bannedMembers: FronvoAccount[];
}
