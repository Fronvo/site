// ******************** //
// Reusable functions for the index route.
// ******************** //

import { goto } from '$app/navigation';
import { indexAnimDuration, indexVisible } from 'stores/index';

export function redirectApp(): void {
    indexVisible.set(false);

    setTimeout(() => {
        goto('app');
    }, indexAnimDuration);
}
