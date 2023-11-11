// ******************** //
// Interfaces for the removeRoomMember event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface RemoveRoomMemberParams {
    roomId: string;
    profileId: string;
}

export interface RemoveRoomMemberResult extends FronvoError {}
