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

    github: {
        hasGithub: boolean;
        githubName: string;
        githubURL: string;
    };
}
