// ******************** //
// Reusable functions for the app profile panel.
// ******************** //

import { userData } from 'stores/app/profile';
import { fetchUser } from 'utilities/app/main';

export function loadProfilePanel(): void {
    loadUserData();
}

async function loadUserData(): Promise<void> {
    userData.set(await fetchUser());
}
