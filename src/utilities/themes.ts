import type { Theme } from 'interfaces/all';
import { socket } from 'stores/main';
import { themes as themesStore } from 'stores/themes';
import { defaultTheme, whiteTheme } from '../themes';
import { getKey, removeKey, setKey } from './global';

export async function loadThemes(): Promise<Theme[]> {
    return new Promise((resolve) => {
        socket.emit('fetchThemes', ({ themes }) => {
            themesStore.set(themes);

            resolve(themes);
        });
    });
}

export function applyThemeLocally(
    title: string,
    bW: string,
    bDW: string,
    bD: string,
    bDD: string
): void {
    if (title == 'Fronvo') {
        removeKey('bW');
        removeKey('bDW');
        removeKey('bD');
        removeKey('bDD');

        return;
    }

    defaultTheme.branding = `#${bD}`;
    defaultTheme.branding_darken = `#${bDD}`;

    whiteTheme.branding = `#${bW}`;
    whiteTheme.branding_darken = `#${bDW}`;

    setKey('bW', bW);
    setKey('bDW', bDW);
    setKey('bD', bD);
    setKey('bDD', bDD);
}

export function checkAndApplyLocalTheme(): void {
    if (!getKey('bW')) return;

    defaultTheme.branding = `#${getKey('bD')}`;
    defaultTheme.branding_darken = `#${getKey('bDD')}`;

    whiteTheme.branding = `#${getKey('bW')}`;
    whiteTheme.branding_darken = `#${getKey('bDW')}`;
}

export function resetLocalTheme(): void {
    removeKey('bW');
    removeKey('bDW');
    removeKey('bD');
    removeKey('bDD');
}
