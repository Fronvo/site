// ******************** //
// Interfaces for the connectionsUpdated event.
// ******************** //

export interface ConnectionsUpdatedResult {
    profileId: string;

    spotify: {
        hasSpotify: boolean;
        spotifyName: string;
        spotifyURL: string;
    };
}
