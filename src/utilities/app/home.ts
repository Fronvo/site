// ******************** //
// Reusable functions for the app home panel.
// ******************** //

import { userData } from 'stores/app/main';
import { socket } from 'stores/global';

export function loadHomePanel(): void {
    fillUserData();
}

function fillUserData(): void {
    socket.emit('fetchProfileId', ({ profileId }) => {
        socket.emit('fetchProfileData', { profileId }, ({ profileData }) => {
            userData.set(profileData);
        });
    });
}
