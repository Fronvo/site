import type { FronvoAccount } from 'interfaces/all';
import type { ClientToServerEvents } from 'interfaces/c2s';
import type { ServerToClientEvents } from 'interfaces/s2c';
import type { Socket } from 'socket.io-client';
import { writable, type Writable } from 'svelte/store';

/****************************** Fronvo client ******************************/
export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export function setSocket(
    socketVar: Socket<ServerToClientEvents, ClientToServerEvents>
): void {
    socket = socketVar;
}
/****************************** Fronvo client ******************************/

/****************************** Fronvo title ******************************/
export const fronvoTitle = writable('');
/****************************** Fronvo title ******************************/

/****************************** Fronvo layout ******************************/
export const showLayout = writable(false);
/****************************** Fronvo layout ******************************/

/****************************** Fronvo dark theme ******************************/
export const darkTheme = writable(undefined);
/****************************** Fronvo dark theme ******************************/

/****************************** Fronvo data saver ******************************/
export const dataSaver = writable(false);
/****************************** Fronvo data saver ******************************/

/****************************** Fronvo chistmas mode ******************************/
export const xmasMode = writable(false);
export const xmasParticleOptions = writable({
    particles: {
        color: {
            value: '#ffffff',
        },

        move: {
            enable: true,
            direction: 'bottom',
            speed: 2,
        },

        number: {
            density: {
                enable: true,
                area: 500,
            },
            value: 4,
        },

        opacity: {
            value: 1,
        },

        shape: {
            type: 'circle',
        },

        size: {
            value: 5,
        },

        // wobbly wobbly right left
        wobble: {
            enable: true,
            distance: 18,
            speed: 3,
        },

        // size randomness
        zIndex: {
            value: { min: 0, max: 100 },
        },
    },
});
/****************************** Fronvo christmas mode ******************************/

/****************************** Fronvo login state ******************************/
export const loginSucceeded: Writable<boolean> = writable();
/****************************** Fronvo login state ******************************/

/****************************** Fronvo guest mode ******************************/
export const guestMode: Writable<boolean> = writable();
/****************************** Fronvo guest mode ******************************/

/****************************** Fronvo loading state ******************************/
export const progressBarVisible = writable(false);
/****************************** Fronvo loading state ******************************/

/****************************** Fronvo caching ******************************/
export const queuedAccounts: Writable<string[]> = writable([]);
export const cachedAccountData: Writable<FronvoAccount[]> = writable([]);
/****************************** Fronvo caching ******************************/
