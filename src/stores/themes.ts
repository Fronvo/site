import type { Theme } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

/****************************** Themes ******************************/
export const themes: Writable<Theme[]> = writable([]);
/****************************** Themes ******************************/
