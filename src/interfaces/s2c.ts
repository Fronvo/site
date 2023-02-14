// ******************** //
// Interfaces for the server to client events of Socket.IO
// ******************** //

import type { ChatRequestUpdatedResult } from './account/chatRequestUpdated';
import type { CommunityChatRequestsUpdatedResult } from './account/communityChatRequestsUpdated';
import type { CommunityMessageDeletedResult } from './account/communityMessageDeleted';
import type { MemberJoinedResult } from './account/memberJoined';
import type { MemberLeftResult } from './account/memberLeft';
import type { NewCommunityMessageResult } from './account/newCommunityMessage';
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
    communityChatRequestsUpdated: ({}: CommunityChatRequestsUpdatedResult) => void;
}
