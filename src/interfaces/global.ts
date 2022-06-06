// ******************** //
// Shared interfaces for all kinds of files.
// ******************** //

import type { Writable } from 'svelte/store';

export interface ErrorLoadParams {
    status: number;
    error: Error;
}

export interface ErrorLoadResult {
    props: {
        status: number;
        error: string;
    };
}

export interface ThemeContext {
    toggle: Function;
    current: Writable<string>;
    theme: Writable<string>;
}
