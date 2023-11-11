// ******************** //
// Interfaces for the joinRoom event file.
// ******************** //

import type { Room, FronvoError } from 'interfaces/all';

export interface JoinRoomParams {
    roomId: string;
}

export interface JoinRoomResult extends FronvoError {
    roomData: Room;
}
