// ******************** //
// Shared variables for the app home panel, after login.
// ******************** //

import type { HomePost } from 'interfaces/app/home';
import { writable, type Writable } from 'svelte/store';

export const homePosts: Writable<HomePost[]> = writable();
