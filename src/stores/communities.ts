import type {
    Community,
    CommunityMessage,
    FronvoAccount,
} from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

export const officialCommunity: Writable<Community> = writable();
export const joinedCommunity: Writable<Community> = writable();
export const targetCommunity: Writable<string> = writable();
export const targetCommunityData: Writable<Community> = writable();
export const communityMessages: Writable<
    {
        message: CommunityMessage;
        profileData: FronvoAccount;
    }[]
> = writable([]);
export const sendContent: Writable<string> = writable('');
export const targetSendHeight: Writable<number> = writable();
export const targetMessageDropdown: Writable<CommunityMessage> = writable();
export const communityLoadingFinished: Writable<boolean> = writable(false);
export const chatRequestAccepted: Writable<boolean> = writable(false);
export const replyingTo: Writable<string> = writable();
export const replyingToId: Writable<string> = writable();
