// ******************** //
// Interfaces for the server to client events of Socket.IO
// ******************** //

import type {
    RegisterVerifyParams,
    RegisterVerifyResult,
} from 'interfaces/socket/noAccount/registerVerify';

export interface ServerToClientEvents {
    registerVerify: (
        {}: RegisterVerifyParams,
        callback?: ({}: RegisterVerifyResult) => void
    ) => void;
}
