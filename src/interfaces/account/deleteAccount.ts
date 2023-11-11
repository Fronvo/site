// ******************** //
// Interfaces for the deleteAccount event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface DeleteAccountParams {
    password: string;
}

export interface DeleteAccountResult extends FronvoError {}
