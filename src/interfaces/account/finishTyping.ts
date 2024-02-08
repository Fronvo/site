// ******************** //
// Interfaces for the finishTyping event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface FinishTypingParams {
    serverId?: string;
    roomId: string;
}

export interface FinishTypingResult extends FronvoError {}
