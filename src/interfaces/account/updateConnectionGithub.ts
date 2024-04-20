// ******************** //
// Interfaces for the updateConnectionGithub event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface UpdateConnectionGithubParams {
    name: string;
    url: string;
    secret: string;
}

export interface UpdateConnectionGithubResult extends FronvoError {}
