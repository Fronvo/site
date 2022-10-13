// ******************** //
// Reusable functions for the index route.
// ******************** //

import { goto } from '$app/navigation';
import { initSocket } from 'stores/all';
import { indexAnimDuration, indexVisible } from 'stores/index';
import { performLogin } from 'utilities/main';

export function redirectApp(): void {
    // Preload socket and login immediately, no delay afterwards
    initSocket(performLogin);

    indexVisible.set(false);

    setTimeout(() => {
        goto('/app');
    }, indexAnimDuration);
}
