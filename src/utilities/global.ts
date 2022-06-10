// ******************** //
// Reusable functions for all kinds of files.
// ******************** //

import type { LocalKeys } from 'types/global';

export function getKey(key: LocalKeys, fallback?: any): any {
    return localStorage.getItem(`fronvo_${key}`) || fallback;
}

export function setKey(key: LocalKeys, value: any): void {
    localStorage.setItem(`fronvo_${key}`, value);
}

export function removeKey(key: LocalKeys): void {
    localStorage.removeItem(`fronvo_${key}`);
}

export function setEnterHandle(
    input: HTMLInputElement,
    target: HTMLButtonElement
): void {
    input.addEventListener('keypress', (ev) => {
        if (ev.key == 'Enter') {
            ev.preventDefault();

            target.click();
        }
    });
}
