// ******************** //
// Interfaces for the client to server events of Socket.IO
// ******************** //

import type {
    CreateCommunityParams,
    CreateCommunityResult,
} from 'interfaces/socket/account/createCommunity';
import type {
    CreatePostParams,
    CreatePostResult,
} from 'interfaces/socket/account/createPost';
import type {
    DeleteCommunityMessageParams,
    DeleteCommunityMessageResult,
} from 'interfaces/socket/account/deleteCommunityMessage';
import type {
    DeletePostParams,
    DeletePostResult,
} from 'interfaces/socket/account/deletePost';
import type {
    FetchCommunityDataParams,
    FetchCommunityDataResult,
} from 'interfaces/socket/account/fetchCommunityData';
import type { FetchCommunityMessagesResult } from 'interfaces/socket/account/fetchCommunityMessages';
import type { FetchHomePostsResult } from 'interfaces/socket/account/fetchHomePosts';
import type {
    FetchProfileDataParams,
    FetchProfileDataResult,
} from 'interfaces/socket/account/fetchProfileData';
import type { FetchProfileIdResult } from 'interfaces/socket/account/fetchProfileId';
import type {
    FetchProfilePostsParams,
    FetchProfilePostsResult,
} from 'interfaces/socket/account/fetchProfilePosts';
import type {
    FindCommunitiesParams,
    FindCommunitiesResult,
} from 'interfaces/socket/account/findCommunities';
import type {
    FindProfilesParams,
    FindProfilesResult,
} from 'interfaces/socket/account/findProfiles';
import type {
    FollowProfileParams,
    FollowProfileResult,
} from 'interfaces/socket/account/followProfile';
import type {
    JoinCommunityParams,
    JoinCommunityResult,
} from 'interfaces/socket/account/joinCommunity';
import type { LeaveCommunityResult } from 'interfaces/socket/account/leaveCommunity';
import type { LogoutResult } from 'interfaces/socket/account/logout';
import type {
    SendCommunityMessageParams,
    SendCommunityMessageResult,
} from 'interfaces/socket/account/sendCommunityMessage';
import type {
    UnfollowProfileParams,
    UnfollowProfileResult,
} from 'interfaces/socket/account/unfollowProfile';
import type {
    UpdateChatRequestParams,
    UpdateChatRequestResult,
} from 'interfaces/socket/account/updateChatRequest';
import type {
    UpdateCommunityDataParams,
    UpdateCommunityDataResult,
} from 'interfaces/socket/account/updateCommunityData';
import type {
    UpdateProfileDataParams,
    UpdateProfileDataResult,
} from 'interfaces/socket/account/updateProfileData';
import type { IsLoggedInResult } from 'interfaces/socket/general/isLoggedIn';
import type {
    LoginParams,
    LoginResult,
} from 'interfaces/socket/noAccount/login';
import type {
    LoginTokenParams,
    LoginTokenResult,
} from 'interfaces/socket/noAccount/loginToken';
import type {
    RegisterParams,
    RegisterResult,
} from 'interfaces/socket/noAccount/register';
import type {
    RegisterVerifyParams,
    RegisterVerifyResult,
} from 'interfaces/socket/noAccount/registerVerify';
import type {
    ResetPasswordParams,
    ResetPasswordResult,
} from 'interfaces/socket/noAccount/resetPassword';
import type {
    ResetPasswordFinalParams,
    ResetPasswordFinalResult,
} from 'interfaces/socket/noAccount/resetPasswordFinal';
import type {
    ResetPasswordVerifyParams,
    ResetPasswordVerifyResult,
} from 'interfaces/socket/noAccount/resetPasswordVerify';

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
    fetchHomePosts: (callback?: ({}: FetchHomePostsResult) => void) => void;
    createCommunity: (
        {}: CreateCommunityParams,
        callback?: ({}: CreateCommunityResult) => void
    ) => void;
    findCommunities: (
        {}: FindCommunitiesParams,
        callback?: ({}: FindCommunitiesResult) => void
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
}
