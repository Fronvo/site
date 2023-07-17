// ******************** //
// Interfaces for the server to client events of Socket.IO
// ******************** //

import type { RoomMessageDeletedResult } from './account/roomMessageDeleted';
import type { MemberJoinedResult } from './account/memberJoined';
import type { MemberLeftResult } from './account/memberLeft';
import type { NewRoomMessageResult } from './account/newRoomMessage';
import type { OnlineStatusUpdatedParams } from './account/onlineStatusUpdated';
import type {
    RegisterVerifyParams,
    RegisterVerifyResult,
} from './noAccount/registerVerify';
import type {
    ResetPasswordFinalParams,
    ResetPasswordFinalResult,
} from './noAccount/resetPasswordFinal';
import type {
    ResetPasswordVerifyParams,
    ResetPasswordVerifyResult,
} from './noAccount/resetPasswordVerify';
import type { RoomDeletedResult } from './account/roomDeleted';
import type { RoomDataUpdatedResult } from './account/roomDataUpdated';
import type { TypingStartedResult } from './account/typingStarted';
import type { TypingEndedResult } from './account/typingEnded';
import type { NewFriendRequestResult } from './account/newFriendRequest';
import type { FriendRemovedResult } from './account/friendRemoved';
import type { PendingFriendRemovedResult } from './account/pendingFriendRemoved';
import type { FriendAddedResult } from './account/friendAdded';
import type { ProfileDataUpdatedResult } from './account/profileDataUpdated';
import type { ProfileStatusUpdatedResult } from './account/profileStatusUpdated';
import type { RoomCreatedResult } from './account/roomCreated';
import type { RoomAddedResult } from './account/roomAdded';
import type { RoomRemovedResult } from './account/roomRemoved';
import type { PostLikesChangedResult } from './account/postLikeCountChanged';
import type { PostRemovedResult } from './account/postRemoved';
import type { PostSharedResult } from './account/postShared';

export interface ServerToClientEvents {
    registerVerify: (
        {}: RegisterVerifyParams,
        callback?: ({}: RegisterVerifyResult) => void
    ) => void;

    resetPasswordVerify: (
        {}: ResetPasswordVerifyParams,
        callback?: ({}: ResetPasswordVerifyResult) => void
    ) => void;

    resetPasswordFinal: (
        {}: ResetPasswordFinalParams,
        callback?: ({}: ResetPasswordFinalResult) => void
    ) => void;

    newRoomMessage: ({}: NewRoomMessageResult) => void;

    roomMessageDeleted: ({}: RoomMessageDeletedResult) => void;

    roomCreated: ({}: RoomCreatedResult) => void;

    roomDeleted: ({}: RoomDeletedResult) => void;

    roomAdded: ({}: RoomAddedResult) => void;

    roomRemoved: ({}: RoomRemovedResult) => void;

    memberJoined: ({}: MemberJoinedResult) => void;

    memberLeft: ({}: MemberLeftResult) => void;

    onlineStatusUpdated: ({}: OnlineStatusUpdatedParams) => void;

    roomDataUpdated: ({}: RoomDataUpdatedResult) => void;

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
}
