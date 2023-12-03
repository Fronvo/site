// ******************** //
// Interfaces for the deleteServer event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface DeleteServerParams {
    serverId: string;
}

export interface DeleteServerResult extends FronvoError {}
