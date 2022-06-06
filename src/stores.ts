// ******************** //
// Shared variables for all kinds of files.
// ******************** //

import { io, Socket } from 'socket.io-client';
import binaryParser from 'socket.io-msgpack-parser';
import { writable } from 'svelte/store';
import type { ClientToServerEvents } from './interfaces/socket/events/c2s';
import type { ServerToClientEvents } from './interfaces/socket/events/s2c';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    'wss://fronvosrv.herokuapp.com',
    {
        transports: ['websocket'],
        path: '/fronvo',
        parser: binaryParser,
        onlyBinaryUpgrades: true,
    }
);

export let logoVisible = writable(true);
export const logoDuration = writable(2250);
export const logoDurationExit = writable(1500);
