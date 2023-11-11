// ******************** //
// Interfaces for the startTyping event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface StartTypingParams {
    roomId: string;
}

export interface StartTypingResult extends FronvoError {}
