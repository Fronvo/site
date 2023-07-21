// ******************** //
// Interfaces for the client to server events of Socket.IO
// ******************** //

import type { CreateRoomParams, CreateRoomResult } from './account/createRoom';
import type {
    FetchRoomMessagesParams,
    FetchRoomMessagesResult,
} from './account/fetchRoomMessages';
import type {
    FetchProfileDataParams,
    FetchProfileDataResult,
} from './account/fetchProfileData';
import type { FetchProfileIdResult } from './account/fetchProfileId';
import type { JoinRoomParams, JoinRoomResult } from './account/joinRoom';
import type { LeaveRoomParams, LeaveRoomResult } from './account/leaveRoom';
import type { LogoutResult } from './account/logout';
import type {
    SendRoomMessageParams,
    SendRoomMessageResult,
} from './account/sendRoomMessage';
import type {
    UpdateRoomDataParams,
    UpdateRoomDataResult,
} from './account/updateRoomData';
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
import type { KickMemberParams, KickMemberResult } from './account/kickMember';
import type {
    UpdateProfileStatusParams,
    UpdateProfileStatusResult,
} from './account/updateProfileStatus';
import type {
    DeleteRoomMessageParams,
    DeleteRoomMessageResult,
} from './account/deleteRoomMessage';
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
import type {
    SendRoomImageParams,
    SendRoomImageResult,
} from './account/sendRoomImage';
import type {
    FetchProfilePostsParams,
    FetchProfilePostsResult,
} from './account/fetchProfilePosts';
import type {
    FetchHomePostsParams,
    FetchHomePostsResult,
} from './account/fetchHomePosts';
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
    FetchThemesParams,
    FetchThemesResult,
} from './account/fetchThemes';
import type { ApplyThemeParams, ApplyThemeResult } from './account/applyTheme';
import type {
    CreateThemeParams,
    CreateThemeResult,
} from './account/createTheme';

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
    createRoom: (
        {}: CreateRoomParams,
        callback?: ({}: CreateRoomResult) => void
    ) => void;
    joinRoom: (
        {}: JoinRoomParams,
        callback?: ({}: JoinRoomResult) => void
    ) => void;
    updateRoomData: (
        {}: UpdateRoomDataParams,
        callback?: ({}: UpdateRoomDataResult) => void
    ) => void;
    leaveRoom: (
        {}: LeaveRoomParams,
        callback?: ({}: LeaveRoomResult) => void
    ) => void;
    sendRoomMessage: (
        {}: SendRoomMessageParams,
        callback?: ({}: SendRoomMessageResult) => void
    ) => void;
    fetchRoomMessages: (
        {}: FetchRoomMessagesParams,
        callback?: ({}: FetchRoomMessagesResult) => void
    ) => void;
    deleteRoomMessage: (
        {}: DeleteRoomMessageParams,
        callback?: ({}: DeleteRoomMessageResult) => void
    ) => void;
    kickMember: (
        {}: KickMemberParams,
        callback?: ({}: KickMemberResult) => void
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
    sendRoomImage: (
        {}: SendRoomImageParams,
        callback?: ({}: SendRoomImageResult) => void
    ) => void;
    fetchProfilePosts: (
        {}: FetchProfilePostsParams,
        callback?: ({}: FetchProfilePostsResult) => void
    ) => void;
    fetchHomePosts: (
        {}: FetchHomePostsParams,
        callback?: ({}: FetchHomePostsResult) => void
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
    fetchThemes: (
        {}: FetchThemesParams,
        callback?: ({}: FetchThemesResult) => void
    ) => void;
    applyTheme: (
        {}: ApplyThemeParams,
        callback?: ({}: ApplyThemeResult) => void
    ) => void;
    createTheme: (
        {}: CreateThemeParams,
        callback?: ({}: CreateThemeResult) => void
    ) => void;
}
