// ******************** //
// Interfaces for the resetPasswordVerify event.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface ResetPasswordVerifyParams {
    code: string;
}

export interface ResetPasswordVerifyResult extends FronvoError {}
