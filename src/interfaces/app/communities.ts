// ******************** //
// Shared interfaces for the app communities panel, after login.
// ******************** //

import type { FronvoAccount } from './main';

export interface Community {
    communityId: string;
    ownerId: string;
    name: string;
    description: string;
    creationDate: string;
    icon?: string;
    members: string[];
    inviteOnly: boolean;
    acceptedChatRequests: string[];
}

export interface CommunityMessage {
    messageId: string;
    ownerId: string;
    content: string;
    creationDate: string;
    isReply: boolean;
    replyId: string;
}

export interface CommunityMessageFinal extends CommunityMessage {
    profileData: FronvoAccount;
}
