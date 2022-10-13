// ******************** //
// Interfaces for the resetPassword event.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface ResetPasswordParams {
    email: string;
}

export interface ResetPasswordResult extends FronvoError {}
