// ******************** //
// Interfaces for the sendImage event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface SendImageParams {
    roomId: string;
    attachment: string;
}

export interface SendImageResult extends FronvoError {}
