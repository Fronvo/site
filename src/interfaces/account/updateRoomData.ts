// ******************** //
// Interfaces for the updateRoomData event file.
// ******************** //

import type { Room, FronvoError } from 'interfaces/all';

export interface UpdateRoomDataParams {
    roomId: string;
    name?: string;
    description?: string;
    icon?: string;
}

export interface UpdateRoomDataResult extends FronvoError {
    roomData: Partial<Room>;
}
