import { indexAnimDuration, indexVisible } from 'stores/index';
import { showLayout } from 'stores/main';

export function redirectApp(): void {
    indexVisible.set(false);

    setTimeout(() => {
        showLayout.set(true);
    }, indexAnimDuration);
}
