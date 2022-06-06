// ******************** //
// Interfaces for the inter-server events of Socket.IO
// ******************** //

export interface InterServerEvents {
    updateRateLimit: ({}: InterUpdateRateLimit) => void;
    updateRateLimitUnauthorised: ({}: InterUpdateRateLimitUnauthorised) => void;
    loginSocket: ({}: InterLoginSocket) => void;
    logoutSocket: ({}: InterLogoutSocket) => void;
}

export interface InterUpdateRateLimit {
    accountId: string;
    pointsToConsume: number;
}

export interface InterUpdateRateLimitUnauthorised {
    socketIP: string;
    pointsToConsume: number;
}

export interface InterLoginSocket {
    socketId: string;
    socketIP: string;
    accountId: string;
}

export interface InterLogoutSocket {
    socketId: string;
}
