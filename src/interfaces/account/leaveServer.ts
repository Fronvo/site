// ******************** //
// Interfaces for the leaveServer event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface LeaveServerParams {
    serverId: string;
}

export interface LeaveServerResult extends FronvoError {}
