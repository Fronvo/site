// ******************** //
// Interfaces for the sendRoomMessage event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface SendRoomMessageParams {
    roomId: string;
    message: string;
    replyId?: string;
}

export interface SendRoomMessageResult extends FronvoError {}
