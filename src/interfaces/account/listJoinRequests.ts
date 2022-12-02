// ******************** //
// Interfaces for the listJoinRequests event file.
// ******************** //

import type { FronvoError, JoinRequest } from 'interfaces/all';

export interface ListJoinRequestsResult extends FronvoError {
    joinRequests: JoinRequest[];
}
