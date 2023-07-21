// ******************** //
// Interfaces for the createTheme event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface CreateThemeParams {
    title: string;
    description: string;
    icon: string;
    brandingWhite: string;
    brandingDarkenWhite: string;
    brandingDark: string;
    brandingDarkenDark: string;
}

export interface CreateThemeResult extends FronvoError {}
