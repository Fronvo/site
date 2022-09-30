// ******************** //
// Interfaces for the updateChatRequest event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface UpdateChatRequestParams {
    profileId: string;
    accepted: boolean;
}

export interface UpdateChatRequestResult extends FronvoError {}
