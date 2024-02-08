// ******************** //
// Interfaces for the startTyping event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface StartTypingParams {
    serverId?: string;
    roomId: string;
}

export interface StartTypingResult extends FronvoError {}
