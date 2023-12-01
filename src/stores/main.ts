import type { FronvoAccount } from 'interfaces/all';
import type { ClientToServerEvents } from 'interfaces/c2s';
import type { ServerToClientEvents } from 'interfaces/s2c';
import type { Socket } from 'socket.io-client';
import { writable, type Writable } from 'svelte/store';

/****************************** Fronvo client ******************************/
// export let SERVER_URL = 'ws://localhost:3001';
export let SERVER_URL = 'wss://srv2.fly.dev';

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
export let secondarySocket: Socket<ServerToClientEvents, ClientToServerEvents>;

export function setSocket(
    socketVar: Socket<ServerToClientEvents, ClientToServerEvents>
): void {
    socket = socketVar;
}

export function setSecondarySocket(
    socketVar: Socket<ServerToClientEvents, ClientToServerEvents>
): void {
    secondarySocket = socketVar;
}
/****************************** Fronvo client ******************************/

/****************************** Fronvo title ******************************/
export const fronvoTitle = writable('');
/****************************** Fronvo title ******************************/

/****************************** Fronvo layout ******************************/
export const showLayout = writable(false);
/****************************** Fronvo layout ******************************/

/****************************** Fronvo token ******************************/
export const currentToken: Writable<string> = writable();
/****************************** Fronvo layout ******************************/
/****************************** Fronvo dark theme ******************************/
export const darkTheme = writable(undefined);
/****************************** Fronvo dark theme ******************************/

/****************************** Fronvo login state ******************************/
export const loginSucceeded: Writable<boolean> = writable();
/****************************** Fronvo login state ******************************/

/****************************** Fronvo caching ******************************/
export const cachedAccountData: Writable<FronvoAccount[]> = writable([]);
/****************************** Fronvo caching ******************************/

/****************************** Fronvo other ******************************/
export const lastSendAt: Writable<string> = writable();
export const lastSendsIn30: Writable<number> = writable(0);
export const disabledIn30: Writable<boolean> = writable(false);
/****************************** Fronvo other ******************************/
