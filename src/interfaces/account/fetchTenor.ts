// ******************** //
// Interfaces for the fetchTenor event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface FetchTenorParams {
    q: string;
}

export interface TenorGifs {
    gif: string;
    gif_medium: string;
    gif_tiny: string;
    gif_nano: string;
}

export interface FetchTenorResult extends FronvoError {
    gifs: TenorGifs[];
}
