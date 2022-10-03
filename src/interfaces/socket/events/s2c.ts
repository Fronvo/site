// ******************** //
// Interfaces for the server to client events of Socket.IO
// ******************** //

import type { ChatRequestUpdatedResult } from 'interfaces/socket/account/chatRequestUpdated';
import type { CommunityMessageDeletedResult } from 'interfaces/socket/account/communityMessageDeleted';
import type { NewCommunityMessageResult } from 'interfaces/socket/account/newCommunityMessage';
import type {
    RegisterVerifyParams,
    RegisterVerifyResult,
} from 'interfaces/socket/noAccount/registerVerify';
import type {
    ResetPasswordFinalParams,
    ResetPasswordFinalResult,
} from 'interfaces/socket/noAccount/resetPasswordFinal';
import type {
    ResetPasswordVerifyParams,
    ResetPasswordVerifyResult,
} from 'interfaces/socket/noAccount/resetPasswordVerify';
import type { MemberJoinedResult } from '../account/memberJoined';
import type { MemberLeftResult } from '../account/memberLeft';

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
    newCommunityMessage: ({}: NewCommunityMessageResult) => void;
    communityMessageDeleted: ({}: CommunityMessageDeletedResult) => void;
    communityDeleted: () => void;
    chatRequestUpdated: ({}: ChatRequestUpdatedResult) => void;
    memberJoined: ({}: MemberJoinedResult) => void;
    memberLeft: ({}: MemberLeftResult) => void;
}
