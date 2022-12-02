// ******************** //
// Interfaces for the acceptJoinRequest event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface AcceptJoinRequestParams {
    email: string;
}

export interface AcceptJoinRequestResult extends FronvoError {}
