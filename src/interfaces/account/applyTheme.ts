// ******************** //
// Interfaces for the applyTheme event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface ApplyThemeParams {
    themeId: string;
}

export interface ApplyThemeResult extends FronvoError {}
