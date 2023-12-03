// ******************** //
// Interfaces for the fetchServers event file.
// ******************** //

import type { FronvoError, Server } from 'interfaces/all';

export interface FetchServersParams {}

export interface FetchServersResult extends FronvoError {
    servers: Server[];
}
