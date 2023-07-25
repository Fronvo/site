// ******************** //
// Interfaces for the applyTheme event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface ApplyThemeParams {
    title: string;
}

export interface ApplyThemeResult extends FronvoError {}
