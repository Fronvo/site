import { writable } from 'svelte/store';
import { io } from 'socket.io-client';

// upon page reload
export const customFadeDuration = 500;

// manual connection timeoutd
export const connectionTimeout = 5000;

// use 'socket' var name in other files, dont reserve
export const sockt = writable();

// replace with ws://localhost:3001 if hosting locally
const tempSocket = io('wss://fronvosrv.herokuapp.com', {
    // only websocket transport, no http polling
    transports: ['websocket'],
    path: '/fronvo'
});

tempSocket.on('connect', () => {
    sockt.set(tempSocket);
});
