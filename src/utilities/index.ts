// ******************** //
// Reusable functions for the index route.
// ******************** //

import { goto } from '$app/navigation';
import { initSocket } from 'src/stores/global';
import { indexAnimDuration, indexVisible } from 'stores/index';

export function redirectApp(): void {
    // Preload socket, less delay
    initSocket();

    indexVisible.set(false);

    setTimeout(() => {
        goto('app');
    }, indexAnimDuration);
}
