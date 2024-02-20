// ******************** //
// Interfaces for the server to client events of Socket.IO
// ******************** //

import type { MessageDeletedResult } from './account/messageDeleted';
import type { MemberJoinedResult } from './account/memberJoined';
import type { MemberLeftResult } from './account/memberLeft';
import type { NewMessageResult } from './account/newMessage';
import type { OnlineStatusUpdatedParams } from './account/onlineStatusUpdated';
import type {
    RegisterVerifyParams,
    RegisterVerifyResult,
} from './noAccount/registerVerify';
import type {
    ResetPasswordVerifyParams,
    ResetPasswordVerifyResult,
} from './noAccount/resetPasswordVerify';
import type { DmHiddenResult } from './account/dmHidden';
import type { TypingStartedResult } from './account/typingStarted';
import type { TypingEndedResult } from './account/typingEnded';
import type { NewFriendRequestResult } from './account/newFriendRequest';
import type { FriendRemovedResult } from './account/friendRemoved';
import type { PendingFriendRemovedResult } from './account/pendingFriendRemoved';
import type { FriendAddedResult } from './account/friendAdded';
import type { ProfileDataUpdatedResult } from './account/profileDataUpdated';
import type { ProfileStatusUpdatedResult } from './account/profileStatusUpdated';
import type { DmCreatedResult } from './account/dmCreated';
import type { PostLikesChangedResult } from './account/postLikesChanged';
import type { PostRemovedResult } from './account/postRemoved';
import type { PostSharedResult } from './account/postShared';
import type { ServerCreatedResult } from './account/serverCreated';
import type { ServerDeletedResult } from './account/serverDeleted';
import type { ChannelCreatedResult } from './account/channelCreated';
import type { ChannelDeletedResult } from './account/channelDeleted';
import type { ServerJoinedResult } from './account/serverJoined';
import type { ServerInvitesToggledResult } from './account/serverInvitesToggled';
import type { ServerInviteRegeneratedResult } from './account/serverInviteRegenerated';
import type { ChannelRenamedResult } from './account/channelRenamed';
import type { MemberBannedResult } from './account/memberBanned';
import type { MemberUnbannedResult } from './account/memberUnbanned';

export interface ServerToClientEvents {
    registerVerify: (
        {}: RegisterVerifyParams,
        callback?: ({}: RegisterVerifyResult) => void
    ) => void;

    resetPasswordVerify: (
        {}: ResetPasswordVerifyParams,
        callback?: ({}: ResetPasswordVerifyResult) => void
    ) => void;

    newMessage: ({}: NewMessageResult) => void;

    messageDeleted: ({}: MessageDeletedResult) => void;

    dmCreated: ({}: DmCreatedResult) => void;

    dmHidden: ({}: DmHiddenResult) => void;

    memberJoined: ({}: MemberJoinedResult) => void;

    memberLeft: ({}: MemberLeftResult) => void;

    memberBanned: ({}: MemberBannedResult) => void;

    memberUnbanned: ({}: MemberUnbannedResult) => void;

    onlineStatusUpdated: ({}: OnlineStatusUpdatedParams) => void;

    typingStarted: ({}: TypingStartedResult) => void;

    typingEnded: ({}: TypingEndedResult) => void;

    newFriendRequest: ({}: NewFriendRequestResult) => void;

    friendRemoved: ({}: FriendRemovedResult) => void;

    friendAdded: ({}: FriendAddedResult) => void;

    pendingFriendRemoved: ({}: PendingFriendRemovedResult) => void;

    profileDataUpdated: ({}: ProfileDataUpdatedResult) => void;

    profileStatusUpdated: ({}: ProfileStatusUpdatedResult) => void;

    postLikesChanged: ({}: PostLikesChangedResult) => void;

    postShared: ({}: PostSharedResult) => void;

    postRemoved: ({}: PostRemovedResult) => void;

    serverCreated: ({}: ServerCreatedResult) => void;

    serverJoined: ({}: ServerJoinedResult) => void;

    serverDeleted: ({}: ServerDeletedResult) => void;

    channelCreated: ({}: ChannelCreatedResult) => void;

    channelRenamed: ({}: ChannelRenamedResult) => void;

    channelDeleted: ({}: ChannelDeletedResult) => void;

    serverInvitesToggled: ({}: ServerInvitesToggledResult) => void;

    serverInviteRegenerated: ({}: ServerInviteRegeneratedResult) => void;
}
