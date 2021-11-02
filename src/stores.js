import { readable } from 'svelte/store';

import { io } from 'socket.io-client';

// replace with ws://localhost:3001 if hosting locally
const socket = io('wss://fronvosrv.herokuapp.com', {
    // only websocket transport, no http polling
    transports: ['websocket'],
    path: '/fronvo'
});

// DO NOT attach listeners, they are reset within each page

// use 'socket' var name in other files, dont reserve
export const sockt = readable(socket);

export const timeoutDelay = 2000;
export const customFadeDuration = 500;
