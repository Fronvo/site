import type { FronvoAccount } from 'interfaces/all';
import type { ClientToServerEvents } from 'interfaces/c2s';
import type { ServerToClientEvents } from 'interfaces/s2c';
import type { Socket } from 'socket.io-client';
import { writable, type Writable } from 'svelte/store';

/****************************** Fronvo client ******************************/
export let SERVER_URL = import.meta.env.DEV
    ? 'ws://localhost:3001'
    : 'wss://frv.onrender.com';

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

/****************************** Fronvo mobile ******************************/
export const isMobile = writable(false);
/****************************** Fronvo mobile ******************************/

/****************************** Fronvo layout ******************************/
export const showLayout = writable(false);
/****************************** Fronvo layout ******************************/

/****************************** Mouse pos, for dropdown ******************************/
export const mousePos = writable([0, 0]);
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
