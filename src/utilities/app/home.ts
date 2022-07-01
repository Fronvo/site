// ******************** //
// Reusable functions for the app home panel.
// ******************** //

import { homeUpdates, userData } from 'stores/app/home';
import { fetchUser } from 'utilities/app/main';

export function loadHomePanel(): void {
    fillUserData();
    fillHomeUpdates();
}

async function fillUserData(): Promise<void> {
    userData.set(await fetchUser());
}

function fillHomeUpdates(): void {
    // TODO: Fetch from server
    homeUpdates.set([]);
}
