// ******************** //
// Reusable functions for the index route.
// ******************** //

import { goto } from '$app/navigation';
import { initSocket, showLayout } from 'stores/all';
import { indexAnimDuration, indexVisible } from 'stores/index';
import { loginSucceeded } from 'stores/main';

export function redirectApp(): void {
    // Preload socket and login immediately, no delay afterwards
    initSocket();

    indexVisible.set(false);

    setTimeout(() => {
        showLayout.set(true);
        loginSucceeded.set(false);

        goto('/home', {
            replaceState: true,
        });
    }, indexAnimDuration);
}
