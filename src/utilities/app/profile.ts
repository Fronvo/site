// ******************** //
// Reusable functions for the app profile panel.
// ******************** //

import { userData } from 'stores/app/profile';
import { fetchUser } from 'utilities/app/main';

export async function loadProfilePanel(targetProfile: string): Promise<void> {
    userData.set(await fetchUser(targetProfile));
}
