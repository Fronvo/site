// ******************** //
// Interfaces for the sendMessage event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface SendMessageParams {
    roomId: string;
    message: string;
    replyId?: string;
}

export interface SendMessageResult extends FronvoError {}
