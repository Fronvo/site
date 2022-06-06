// ******************** //
// Interfaces for the client to server events of Socket.IO
// ******************** //

import type {
    FetchProfileDataParams,
    FetchProfileDataResult,
} from 'interfaces/socket/account/fetchProfileData';
import type { FetchProfileIdResult } from 'interfaces/socket/account/fetchProfileId';
import type { LogoutResult } from 'interfaces/socket/account/logout';
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
}
