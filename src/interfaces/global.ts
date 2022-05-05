// ******************** //
// Shared interfaces for all kinds of files.
// ******************** //

export interface ErrorLoadParams {
    status: number;
    error: Error;
}

export interface ErrorLoadResult {
    props: {
        status: number;
        error: string;
    };
}
