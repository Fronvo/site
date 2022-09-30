// ******************** //
// Interfaces for the server to client events of Socket.IO
// ******************** //

import type {
    RegisterVerifyParams,
    RegisterVerifyResult,
} from 'interfaces/socket/noAccount/registerVerify';
import type { ChatRequestUpdatedResult } from '../account/chatRequestUpdated';
import type { CommunityMessageDeletedResult } from '../account/communityMessageDeleted';
import type { NewCommunityMessageResult } from '../account/newCommunityMessage';
import type {
    ResetPasswordFinalParams,
    ResetPasswordFinalResult,
} from '../noAccount/resetPasswordFinal';
import type {
    ResetPasswordVerifyParams,
    ResetPasswordVerifyResult,
} from '../noAccount/resetPasswordVerify';

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
}
