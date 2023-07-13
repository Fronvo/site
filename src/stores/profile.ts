// ******************** //
// Shared variables for the app profile panel, after login.
// ******************** //

import type { FronvoAccount } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

/****************************** Our data ******************************/
export const ourData: Writable<FronvoAccount> = writable();
/****************************** Our data ******************************/

/****************************** Preview data ******************************/
export const previewData: Writable<FronvoAccount> = writable();
/****************************** Preview data ******************************/
