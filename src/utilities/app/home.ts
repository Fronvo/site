// ******************** //
// Reusable functions for the app home panel.
// ******************** //

import { homeUpdates } from 'stores/app/home';

export function loadHomePanel(): void {
    loadHomeUpdates();
}

function loadHomeUpdates(): void {
    // TODO: Fetch from server
    homeUpdates.set([]);
}
