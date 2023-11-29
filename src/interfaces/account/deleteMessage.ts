// ******************** //
// Interfaces for the deleteMessage event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface DeleteMessageParams {
    roomId: string;
    messageId: string;
}

export interface DeleteMessageResult extends FronvoError {}
