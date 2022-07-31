// ******************** //
// Interfaces for the client to server events of Socket.IO
// ******************** //

import type {
    CreatePostParams,
    CreatePostResult,
} from 'interfaces/socket/account/createPost';
import type {
    FetchProfileDataParams,
    FetchProfileDataResult,
} from 'interfaces/socket/account/fetchProfileData';
import type { FetchProfileIdResult } from 'interfaces/socket/account/fetchProfileId';
import type {
    FetchProfilePostsParams,
    FetchProfilePostsResult,
} from 'interfaces/socket/account/fetchProfilePosts';
import type { LogoutResult } from 'interfaces/socket/account/logout';
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
}
