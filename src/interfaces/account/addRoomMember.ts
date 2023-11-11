// ******************** //
// Interfaces for the addRoomMember event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface AddRoomMemberParams {
    roomId: string;
    profileId: string;
}

export interface AddRoomMemberResult extends FronvoError {}
