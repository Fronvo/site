import { indexVisible } from 'stores/index';
import { showLayout } from 'stores/main';

export function redirectApp(): void {
    indexVisible.set(false);
    showLayout.set(true);
}
