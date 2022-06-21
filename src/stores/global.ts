// ******************** //
// Shared variables for all kinds of files.
// ******************** //

import type { ClientToServerEvents } from 'interfaces/socket/events/c2s';
import type { ServerToClientEvents } from 'interfaces/socket/events/s2c';
import { io, Socket } from 'socket.io-client';
import binaryParser from 'socket.io-msgpack-parser';
import { writable } from 'svelte/store';

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export function initSocket(callback?: Function): void {
    // Only init once, callback discarded
    if (socket) return;

    socket = io('wss://fronvosrv.herokuapp.com', {
        transports: ['websocket'],
        path: '/fronvo',
        parser: binaryParser,
        onlyBinaryUpgrades: true,
    });

    socket.on('connect', () => {
        callback();
    });
}

export function resetSocket(): void {
    // Only reset once
    if (!socket) return;

    socket.disconnect();

    socket = undefined;
}

export const showLayout = writable(false);
