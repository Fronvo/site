import type {
    Community,
    CommunityMessage,
    FronvoAccount,
} from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

export const ourProfileData: Writable<FronvoAccount> = writable();
export const officialCommunity: Writable<Community> = writable();
export const joinedCommunity: Writable<Community> = writable();
export const targetCommunity: Writable<string> = writable();
export const targetCommunityData: Writable<Community> = writable();
export const targetCommunityMessages: Writable<CommunityMessage[]> = writable();
export const sendContent: Writable<string> = writable();
export const targetSendHeight: Writable<number> = writable();
export const maxChatAnimDelay: Writable<number> = writable(350);
export const targetMessageDropdown: Writable<CommunityMessage> = writable();
export const initialCommunityLoadingFinished: Writable<boolean> =
    writable(false);
export const chatRequestAccepted: Writable<boolean> = writable(false);
export const replyingTo: Writable<string> = writable();
export const replyingToId: Writable<string> = writable();
