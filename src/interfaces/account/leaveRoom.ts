// ******************** //
// Interfaces for the leaveRoom event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface LeaveRoomParams {
    roomId: string;
}

export interface LeaveRoomResult extends FronvoError {}
