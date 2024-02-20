// ******************** //
// Interfaces for the client to server events of Socket.IO
// ******************** //

import type {
    FetchMessagesParams,
    FetchMessagesResult,
} from './account/fetchMessages';
import type {
    FetchProfileDataParams,
    FetchProfileDataResult,
} from './account/fetchProfileData';
import type { FetchProfileIdResult } from './account/fetchProfileId';
import type { LogoutResult } from './account/logout';
import type {
    SendMessageParams,
    SendMessageResult,
} from './account/sendMessage';
import type {
    UpdateProfileDataParams,
    UpdateProfileDataResult,
} from './account/updateProfileData';
import type { IsLoggedInResult } from './general/isLoggedIn';
import type { LoginParams, LoginResult } from './noAccount/login';
import type {
    LoginTokenParams,
    LoginTokenResult,
} from './noAccount/loginToken';
import type { RegisterParams, RegisterResult } from './noAccount/register';
import type {
    RegisterVerifyParams,
    RegisterVerifyResult,
} from './noAccount/registerVerify';
import type {
    ResetPasswordParams,
    ResetPasswordResult,
} from './noAccount/resetPassword';
import type {
    ResetPasswordVerifyParams,
    ResetPasswordVerifyResult,
} from './noAccount/resetPasswordVerify';
import type {
    UpdateProfileStatusParams,
    UpdateProfileStatusResult,
} from './account/updateProfileStatus';
import type {
    DeleteMessageParams,
    DeleteMessageResult,
} from './account/deleteMessage';
import type { FetchConvosResult } from './account/fetchConvos';
import type {
    StartTypingParams,
    StartTypingResult,
} from './account/startTyping';
import type {
    FinishTypingParams,
    FinishTypingResult,
} from './account/finishTyping';
import type { AddFriendParams, AddFriendResult } from './account/addFriend';
import type {
    RejectFriendRequestParams,
    RejectFriendRequestResult,
} from './account/rejectFriendRequest';
import type {
    AcceptFriendRequestParams,
    AcceptFriendRequestResult,
} from './account/acceptFriendRequest';
import type {
    RemoveFriendParams,
    RemoveFriendResult,
} from './account/removeFriend';
import type {
    AddRoomMemberParams,
    AddRoomMemberResult,
} from './account/addRoomMember';
import type {
    RemoveRoomMemberParams,
    RemoveRoomMemberResult,
} from './account/removeRoomMember';
import type { CreateDMParams, CreateDMResult } from './account/createDM';
import type { SendImageParams, SendImageResult } from './account/sendImage';
import type {
    FetchProfilePostsParams,
    FetchProfilePostsResult,
} from './account/fetchProfilePosts';
import type {
    FetchDashboardParams,
    FetchDashboardResult,
} from './account/fetchDashboard';
import type { CloseDMParams, CloseDMResult } from './account/closeDM';
import type { LikePostParams, LikePostResult } from './account/likePost';
import type { RequestDataResult } from './account/requestData';
import type { SharePostParams, SharePostResult } from './account/sharePost';
import type { DeletePostParams, DeletePostResult } from './account/deletePost';
import type {
    DeleteAccountParams,
    DeleteAccountResult,
} from './account/deleteAccount';
import type { FetchTenorParams, FetchTenorResult } from './account/fetchTenor';
import type {
    CreateServerParams,
    CreateServerResult,
} from './account/createServer';
import type {
    DeleteServerParams,
    DeleteServerResult,
} from './account/deleteServer';
import type { FetchServersResult } from './account/fetchServers';
import type {
    CreateChannelParams,
    CreateChannelResult,
} from './account/createChannel';
import type {
    FetchChannelMessagesParams,
    FetchChannelMessagesResult,
} from './account/fetchChannelMessages';
import type {
    SendChannelMessageParams,
    SendChannelMessageResult,
} from './account/sendChannelMessage';
import type {
    SendChannelImageParams,
    SendChannelImageResult,
} from './account/sendChannelImage';
import type { JoinServerParams, JoinServerResult } from './account/joinServer';
import type {
    ToggleServerInvitesParams,
    ToggleServerInvitesResult,
} from './account/toggleServerInvites';
import type {
    RegenerateServerInviteParams,
    RegenerateServerInviteResult,
} from './account/regenerateServerInvite';
import type {
    DeleteChannelParams,
    DeleteChannelResult,
} from './account/deleteChannel';
import type {
    DeleteChannelMessageParams,
    DeleteChannelMessageResult,
} from './account/deleteChannelMessage';
import type {
    RenameChannelParams,
    RenameChannelResult,
} from './account/renameChannel';
import type { SendPostParams, SendPostResult } from './account/sendPost';
import type {
    LeaveServerParams,
    LeaveServerResult,
} from './account/leaveServer';

export interface ClientToServerEvents {
    register: (
        {}: RegisterParams,
        callback?: ({}: RegisterResult) => void
    ) => void;
    registerVerify: (
        {}: RegisterVerifyParams,
        callback?: ({}: RegisterVerifyResult) => void
    ) => void;
    login: ({}: LoginParams, callback?: ({}: LoginResult) => void) => void;
    loginToken: (
        {}: LoginTokenParams,
        callback?: ({}: LoginTokenResult) => void
    ) => void;
    isLoggedIn: (callback?: ({}: IsLoggedInResult) => void) => void;
    fetchProfileId: (callback?: ({}: FetchProfileIdResult) => void) => void;
    fetchProfileData: (
        {}: FetchProfileDataParams,
        callback?: ({}: FetchProfileDataResult) => void
    ) => void;
    logout: (callback?: ({}: LogoutResult) => void) => void;
    resetPassword: (
        {}: ResetPasswordParams,
        callback?: ({}: ResetPasswordResult) => void
    ) => void;
    resetPasswordVerify: (
        {}: ResetPasswordVerifyParams,
        callback?: ({}: ResetPasswordVerifyResult) => void
    ) => void;
    updateProfileData: (
        {}: UpdateProfileDataParams,
        callback?: ({}: UpdateProfileDataResult) => void
    ) => void;
    sendMessage: (
        {}: SendMessageParams,
        callback?: ({}: SendMessageResult) => void
    ) => void;
    fetchMessages: (
        {}: FetchMessagesParams,
        callback?: ({}: FetchMessagesResult) => void
    ) => void;
    deleteMessage: (
        {}: DeleteMessageParams,
        callback?: ({}: DeleteMessageResult) => void
    ) => void;
    updateProfileStatus: (
        {}: UpdateProfileStatusParams,
        callback?: ({}: UpdateProfileStatusResult) => void
    ) => void;
    fetchConvos: (callback?: ({}: FetchConvosResult) => void) => void;
    startTyping: (
        {}: StartTypingParams,
        callback?: ({}: StartTypingResult) => void
    ) => void;
    finishTyping: (
        {}: FinishTypingParams,
        callback?: ({}: FinishTypingResult) => void
    ) => void;
    addFriend: (
        {}: AddFriendParams,
        callback?: ({}: AddFriendResult) => void
    ) => void;
    removeFriend: (
        {}: RemoveFriendParams,
        callback?: ({}: RemoveFriendResult) => void
    ) => void;
    rejectFriendRequest: (
        {}: RejectFriendRequestParams,
        callback?: ({}: RejectFriendRequestResult) => void
    ) => void;
    acceptFriendRequest: (
        {}: AcceptFriendRequestParams,
        callback?: ({}: AcceptFriendRequestResult) => void
    ) => void;
    addRoomMember: (
        {}: AddRoomMemberParams,
        callback?: ({}: AddRoomMemberResult) => void
    ) => void;
    removeRoomMember: (
        {}: RemoveRoomMemberParams,
        callback?: ({}: RemoveRoomMemberResult) => void
    ) => void;
    createDM: (
        {}: CreateDMParams,
        callback?: ({}: CreateDMResult) => void
    ) => void;
    sendImage: (
        {}: SendImageParams,
        callback?: ({}: SendImageResult) => void
    ) => void;
    fetchProfilePosts: (
        {}: FetchProfilePostsParams,
        callback?: ({}: FetchProfilePostsResult) => void
    ) => void;
    fetchDashboard: (
        {}: FetchDashboardParams,
        callback?: ({}: FetchDashboardResult) => void
    ) => void;
    closeDM: (
        {}: CloseDMParams,
        callback?: ({}: CloseDMResult) => void
    ) => void;
    likePost: (
        {}: LikePostParams,
        callback?: ({}: LikePostResult) => void
    ) => void;
    requestData: (callback?: ({}: RequestDataResult) => void) => void;
    deleteAccount: (
        {}: DeleteAccountParams,
        callback?: ({}: DeleteAccountResult) => void
    ) => void;
    sharePost: (
        {}: SharePostParams,
        callback?: ({}: SharePostResult) => void
    ) => void;
    deletePost: (
        {}: DeletePostParams,
        callback?: ({}: DeletePostResult) => void
    ) => void;
    fetchTenor: (
        {}: FetchTenorParams,
        callback?: ({}: FetchTenorResult) => void
    ) => void;
    createServer: (
        {}: CreateServerParams,
        callback?: ({}: CreateServerResult) => void
    ) => void;
    deleteServer: (
        {}: DeleteServerParams,
        callback?: ({}: DeleteServerResult) => void
    ) => void;
    fetchServers: (callback?: ({}: FetchServersResult) => void) => void;
    createChannel: (
        {}: CreateChannelParams,
        callback?: ({}: CreateChannelResult) => void
    ) => void;
    fetchChannelMessages: (
        {}: FetchChannelMessagesParams,
        callback?: ({}: FetchChannelMessagesResult) => void
    ) => void;
    sendChannelMessage: (
        {}: SendChannelMessageParams,
        callback?: ({}: SendChannelMessageResult) => void
    ) => void;
    sendChannelImage: (
        {}: SendChannelImageParams,
        callback?: ({}: SendChannelImageResult) => void
    ) => void;
    joinServer: (
        {}: JoinServerParams,
        callback?: ({}: JoinServerResult) => void
    ) => void;
    toggleServerInvites: (
        {}: ToggleServerInvitesParams,
        callback?: ({}: ToggleServerInvitesResult) => void
    ) => void;
    regenerateServerInvite: (
        {}: RegenerateServerInviteParams,
        callback?: ({}: RegenerateServerInviteResult) => void
    ) => void;
    deleteChannel: (
        {}: DeleteChannelParams,
        callback?: ({}: DeleteChannelResult) => void
    ) => void;
    deleteChannelMessage: (
        {}: DeleteChannelMessageParams,
        callback?: ({}: DeleteChannelMessageResult) => void
    ) => void;
    renameChannel: (
        {}: RenameChannelParams,
        callback?: ({}: RenameChannelResult) => void
    ) => void;
    sendPost: (
        {}: SendPostParams,
        callback?: ({}: SendPostResult) => void
    ) => void;
    leaveServer: (
        {}: LeaveServerParams,
        callback?: ({}: LeaveServerResult) => void
    ) => void;
}
