// ******************** //
// Interfaces for the createRoom event file.
// ******************** //

import type { Room, FronvoError } from 'interfaces/all';

export interface CreateRoomParams {
    name: string;
    icon?: string;
}

export interface CreateRoomResult extends FronvoError {
    roomData: Room;
}
