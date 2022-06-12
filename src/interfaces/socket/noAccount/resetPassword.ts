// ******************** //
// Interfaces for the resetPassword event.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface ResetPasswordParams {
    email: string;
}

export interface ResetPasswordResult extends FronvoError {}
