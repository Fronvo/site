// ******************** //
// Interfaces for the finishTyping event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface FinishTypingParams {
    roomId: string;
}

export interface FinishTypingResult extends FronvoError {}
