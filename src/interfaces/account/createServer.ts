// ******************** //
// Interfaces for the createServer event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface CreateServerParams {
    name: string;
}

export interface CreateServerResult extends FronvoError {}
