import type {
    Community,
    CommunityMessage,
    FronvoAccount,
} from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

/****************************** Community ******************************/
export const communityData: Writable<Community> = writable();
export const communityMessages: Writable<
    {
        message: CommunityMessage;
        profileData: FronvoAccount;
    }[]
> = writable([]);
/****************************** Community ******************************/

/****************************** Message ******************************/
export const sendContent: Writable<string> = writable('');
/****************************** Message ******************************/

/****************************** Chat request ******************************/
export const chatRequestAccepted: Writable<boolean> = writable(false);
/****************************** Chat request ******************************/

/****************************** Reply ******************************/
export const replyingTo: Writable<string> = writable();
export const replyingToId: Writable<string> = writable();
/****************************** Reply ******************************/

/****************************** FollowInfoModal ******************************/
export const targetMessageDropdown: Writable<CommunityMessage> = writable();
/****************************** FollowInfoModal ******************************/
