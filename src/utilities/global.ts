// ******************** //
// Reusable functions for all kinds of files.
// ******************** //

import type { LocalKeys } from 'types/all';

export function getKey(key: LocalKeys, fallback?: any): any {
    return localStorage.getItem(`fronvo_${key}`) || fallback;
}

export function setKey(key: LocalKeys, value: any): void {
    localStorage.setItem(`fronvo_${key}`, value);
}

export function removeKey(key: LocalKeys): void {
    localStorage.removeItem(`fronvo_${key}`);
}
