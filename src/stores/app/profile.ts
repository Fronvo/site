// ******************** //
// Shared variables for the app friends panel, after login.
// ******************** //

import type { FronvoFriends } from 'interfaces/app/friends';
import type { FronvoAccount } from 'interfaces/app/main';
import { writable, type Writable } from 'svelte/store';

export const userData: Writable<FronvoAccount> = writable();
export const friendsAdded: Writable<FronvoFriends[]> = writable();
export const friendRequests: Writable<FronvoFriends[]> = writable();
