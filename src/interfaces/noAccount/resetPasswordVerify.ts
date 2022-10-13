// ******************** //
// Interfaces for the resetPasswordVerify event.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface ResetPasswordVerifyParams {
    code: string;
}

export interface ResetPasswordVerifyResult extends FronvoError {}
