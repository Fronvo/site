// ******************** //
// Interfaces for the sendRoomImage event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface SendRoomImageParams {
    roomId: string;
    attachment: string;
}

export interface SendRoomImageResult extends FronvoError {}
