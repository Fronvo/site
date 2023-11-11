// ******************** //
// Interfaces for the loginToken event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface LoginTokenParams {
    token: string;
}

export interface LoginTokenResult extends FronvoError {}
