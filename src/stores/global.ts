// ******************** //
// Shared variables for all kinds of files.
// ******************** //

import type { ClientToServerEvents } from 'interfaces/socket/events/c2s';
import type { ServerToClientEvents } from 'interfaces/socket/events/s2c';
import { io, Socket } from 'socket.io-client';
import binaryParser from 'socket.io-msgpack-parser';
import { writable } from 'svelte/store';

export const socketConnected = writable(false);

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export function initSocket() {
    socket = io('wss://fronvosrv.herokuapp.com', {
        transports: ['websocket'],
        path: '/fronvo',
        parser: binaryParser,
        onlyBinaryUpgrades: true,
    });

    socket.on('connect', () => {
        socketConnected.set(true);
    });
}
