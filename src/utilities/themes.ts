import type { Theme } from 'interfaces/all';
import { socket } from 'stores/main';
import { themes as themesStore } from 'stores/themes';
import { currentTheme, defaultTheme } from '../themes';
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
    bW: string,
    bDW: string,
    bD: string,
    bDD: string
): void {
    currentTheme.set(undefined);
    currentTheme.set(defaultTheme);

    setKey('bW', bW);
    setKey('bDW', bDW);
    setKey('bD', bD);
    setKey('bDD', bDD);

    document.documentElement.style.setProperty(
        '--branding',
        !getKey('darkTheme') || getKey('darkTheme') == 'true'
            ? `#${bD}`
            : `#${bW}`
    );
    document.documentElement.style.setProperty(
        '--branding_darken',
        !getKey('darkTheme') || getKey('darkTheme') == 'true'
            ? `#${bDD}`
            : `#${bDW}`
    );
}

export function resetLocalTheme(): void {
    removeKey('bW');
    removeKey('bDW');
    removeKey('bD');
    removeKey('bDD');
}
