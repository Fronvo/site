// ******************** //
// Interfaces for the deleteRoomMessage event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface DeleteRoomMessageParams {
    roomId: string;
    messageId: string;
}

export interface DeleteRoomMessageResult extends FronvoError {}
