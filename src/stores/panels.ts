import CommunitiesPanel from '$lib/app/main/panels/CommunityPanel.svelte';
import HomePanel from '$lib/app/main/panels/HomePanel.svelte';
import ProfilePanel from '$lib/app/main/panels/ProfilePanel.svelte';

import { writable } from 'svelte/store';

/****************************** Panels ******************************/
export const panels = [HomePanel, ProfilePanel, CommunitiesPanel];
/****************************** Panels ******************************/

/****************************** Panel Exports ******************************/
export enum PanelTypes {
    Home,
    Profile,
    Community,
}
/****************************** Panel Exports ******************************/

/****************************** Panel settings ******************************/
export const currentPanelId = writable(0);
/****************************** Panel settings ******************************/
