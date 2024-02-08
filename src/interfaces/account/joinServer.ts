// ******************** //
// Interfaces for the joinServer event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface JoinServerParams {
    invite: string;
}

export interface JoinServerResult extends FronvoError {}
