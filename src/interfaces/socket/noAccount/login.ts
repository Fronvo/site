// ******************** //
// Interfaces for the login event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResult extends FronvoError {
    token: string;
}
