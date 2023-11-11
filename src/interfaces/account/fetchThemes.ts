// ******************** //
// Interfaces for the fetchThemes event file.
// ******************** //

import type { FronvoError, Theme } from 'interfaces/all';

export interface FetchThemesParams {}

export interface FetchThemesResult extends FronvoError {
    themes: Theme[];
}
