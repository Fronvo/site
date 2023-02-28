// ******************** //
// Interfaces for the client to server events of Socket.IO
// ******************** //

import type {
    CreateCommunityParams,
    CreateCommunityResult,
} from './account/createCommunity';
import type { CreatePostParams, CreatePostResult } from './account/createPost';
import type {
    DeleteCommunityMessageParams,
    DeleteCommunityMessageResult,
} from './account/deleteCommunityMessage';
import type { DeletePostParams, DeletePostResult } from './account/deletePost';
import type {
    FetchCommunityDataParams,
    FetchCommunityDataResult,
} from './account/fetchCommunityData';
import type {
    FetchCommunityMessagesParams,
    FetchCommunityMessagesResult,
} from './account/fetchCommunityMessages';
import type {
    FetchHomePostsParams,
    FetchHomePostsResult,
} from './account/fetchHomePosts';
import type {
    FetchProfileDataParams,
    FetchProfileDataResult,
} from './account/fetchProfileData';
import type { FetchProfileIdResult } from './account/fetchProfileId';
import type {
    FetchProfilePostsParams,
    FetchProfilePostsResult,
} from './account/fetchProfilePosts';
import type {
    FindProfilesParams,
    FindProfilesResult,
} from './account/findProfiles';
import type {
    FollowProfileParams,
    FollowProfileResult,
} from './account/followProfile';
import type {
    JoinCommunityParams,
    JoinCommunityResult,
} from './account/joinCommunity';
import type { LeaveCommunityResult } from './account/leaveCommunity';
import type { LogoutResult } from './account/logout';
import type {
    SendCommunityMessageParams,
    SendCommunityMessageResult,
} from './account/sendCommunityMessage';
import type {
    ToggleDisableAccountParams,
    ToggleDisableAccountResult,
} from './account/toggleDisableAccount';
import type {
    UnfollowProfileParams,
    UnfollowProfileResult,
} from './account/unfollowProfile';
import type {
    UpdateChatRequestParams,
    UpdateChatRequestResult,
} from './account/updateChatRequest';
import type {
    UpdateCommunityDataParams,
    UpdateCommunityDataResult,
} from './account/updateCommunityData';
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
    ResetPasswordFinalParams,
    ResetPasswordFinalResult,
} from './noAccount/resetPasswordFinal';
import type {
    ResetPasswordVerifyParams,
    ResetPasswordVerifyResult,
} from './noAccount/resetPasswordVerify';
import type {
    AcceptJoinRequestParams,
    AcceptJoinRequestResult,
} from './account/acceptJoinRequest';
import type { ListJoinRequestsResult } from './account/listJoinRequests';
import type {
    RejectJoinRequestParams,
    RejectJoinRequestResult,
} from './account/rejectJoinRequest';
import type {
    FetchHomePostsGuestParams,
    FetchHomePostsGuestResult,
} from './noAccount/fetchHomePostsGuest';
import type {
    FetchProfileDataGuestParams,
    FetchProfileDataGuestResult,
} from './noAccount/fetchProfileDataGuest';
import type { KickMemberParams, KickMemberResult } from './account/kickMember';
import type { BanMemberParams, BanMemberResult } from './account/banMember';
import type { ShowBannedMembersResult } from './account/showBannedMembers';
import type {
    UnbanMemberParams,
    UnbanMemberResult,
} from './account/unbanMember';

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

    resetPasswordFinal: (
        {}: ResetPasswordFinalParams,
        callback?: ({}: ResetPasswordFinalResult) => void
    ) => void;
    updateProfileData: (
        {}: UpdateProfileDataParams,
        callback?: ({}: UpdateProfileDataResult) => void
    ) => void;
    createPost: (
        {}: CreatePostParams,
        callback?: ({}: CreatePostResult) => void
    ) => void;
    fetchProfilePosts: (
        {}: FetchProfilePostsParams,
        callback?: ({}: FetchProfilePostsResult) => void
    ) => void;
    deletePost: (
        {}: DeletePostParams,
        callback?: ({}: DeletePostResult) => void
    ) => void;
    followProfile: (
        {}: FollowProfileParams,
        callback?: ({}: FollowProfileResult) => void
    ) => void;
    unfollowProfile: (
        {}: UnfollowProfileParams,
        callback?: ({}: UnfollowProfileResult) => void
    ) => void;
    findProfiles: (
        {}: FindProfilesParams,
        callback?: ({}: FindProfilesResult) => void
    ) => void;
    fetchHomePosts: (
        {}: FetchHomePostsParams,
        callback?: ({}: FetchHomePostsResult) => void
    ) => void;
    createCommunity: (
        {}: CreateCommunityParams,
        callback?: ({}: CreateCommunityResult) => void
    ) => void;
    joinCommunity: (
        {}: JoinCommunityParams,
        callback?: ({}: JoinCommunityResult) => void
    ) => void;
    fetchCommunityData: (
        {}: FetchCommunityDataParams,
        callback?: ({}: FetchCommunityDataResult) => void
    ) => void;
    updateCommunityData: (
        {}: UpdateCommunityDataParams,
        callback?: ({}: UpdateCommunityDataResult) => void
    ) => void;
    leaveCommunity: (callback?: ({}: LeaveCommunityResult) => void) => void;
    sendCommunityMessage: (
        {}: SendCommunityMessageParams,
        callback?: ({}: SendCommunityMessageResult) => void
    ) => void;
    fetchCommunityMessages: (
        {}: FetchCommunityMessagesParams,
        callback?: ({}: FetchCommunityMessagesResult) => void
    ) => void;
    deleteCommunityMessage: (
        {}: DeleteCommunityMessageParams,
        callback?: ({}: DeleteCommunityMessageResult) => void
    ) => void;
    updateChatRequest: (
        {}: UpdateChatRequestParams,
        callback?: ({}: UpdateChatRequestResult) => void
    ) => void;
    toggleDisableAccount: (
        {}: ToggleDisableAccountParams,
        callback?: ({}: ToggleDisableAccountResult) => void
    ) => void;
    acceptJoinRequest: (
        {}: AcceptJoinRequestParams,
        callback?: ({}: AcceptJoinRequestResult) => void
    ) => void;
    listJoinRequests: (callback?: ({}: ListJoinRequestsResult) => void) => void;
    rejectJoinRequest: (
        {}: RejectJoinRequestParams,
        callback?: ({}: RejectJoinRequestResult) => void
    ) => void;
    fetchHomePostsGuest: (
        {}: FetchHomePostsGuestParams,
        callback?: ({}: FetchHomePostsGuestResult) => void
    ) => void;
    fetchProfileDataGuest: (
        {}: FetchProfileDataGuestParams,
        callback?: ({}: FetchProfileDataGuestResult) => void
    ) => void;
    kickMember: (
        {}: KickMemberParams,
        callback?: ({}: KickMemberResult) => void
    ) => void;
    banMember: (
        {}: BanMemberParams,
        callback?: ({}: BanMemberResult) => void
    ) => void;
    showBannedMembers: (
        callback?: ({}: ShowBannedMembersResult) => void
    ) => void;
    unbanMember: (
        {}: UnbanMemberParams,
        callback?: ({}: UnbanMemberResult) => void
    ) => void;
}
