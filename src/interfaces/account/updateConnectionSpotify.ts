// ******************** //
// Interfaces for the updateConnectionSpotify event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface UpdateConnectionSpotifyParams {
    name: string;
    url: string;
    refresh_token: string;
    accessToken: string;
    tokenType: string;
    secret: string;
}

export interface UpdateConnectionSpotifyResult extends FronvoError {}
