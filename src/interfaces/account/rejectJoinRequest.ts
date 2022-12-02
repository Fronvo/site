// ******************** //
// Interfaces for the rejectJoinRequest event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface RejectJoinRequestParams {
    email: string;
}

export interface RejectJoinRequestResult extends FronvoError {}
