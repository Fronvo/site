import type { Community, CommunityMessage } from 'interfaces/app/communities';
import type { FronvoAccount } from 'interfaces/app/main';
import { writable, type Writable } from 'svelte/store';

export const ourProfileData: Writable<FronvoAccount> = writable();
export const officialCommunity: Writable<Community> = writable();
export const joinedCommunity: Writable<Community> = writable();
export const targetCommunity: Writable<string> = writable();
export const targetCommunityData: Writable<Community> = writable();
export const targetCommunityMessages: Writable<CommunityMessage[]> = writable();
export const sendContent: Writable<string> = writable();
export const targetSendHeight: Writable<string> = writable();
export const maxChatAnimDelay: Writable<number> = writable(350);
export const targetMessageDropdown: Writable<CommunityMessage> = writable();
export const initialCommunityLoadingFinished: Writable<boolean> =
    writable(false);
export const chatRequestAccepted: Writable<boolean> = writable(false);
