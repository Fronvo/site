// ******************** //
// Reusable functions for the app route, after login.
// ******************** //

import { tokenInvalid } from 'stores/app/global';
import {
    currentModal,
    currentPanelId,
    loginSucceeded,
    modalVisible,
    userData,
} from 'stores/app/main';
import { socket } from 'stores/global';
import type { ModalTypes, PanelTypes } from 'types/app/main';
import { getKey, removeKey, setKey } from 'utilities/global';

export function performLogin(): void {
    // Get current login state
    socket.emit('isLoggedIn', ({ loggedIn }) => {
        // If not logged in, attempt to login with stored token
        if (!loggedIn) {
            socket.emit('loginToken', { token: getKey('token') }, ({ err }) => {
                // If the login failed, reset token and redirect to accounts
                if (err) {
                    removeKey('token');
                    tokenInvalid.set(true);
                } else {
                    // Login succeeded, advance
                    fillUserData();
                }
            });
        } else {
            // Already logged in, skip manual login
            fillUserData();
        }
    });
}

export function fillUserData(): void {
    socket.emit('fetchProfileId', ({ profileId }) => {
        socket.emit('fetchProfileData', { profileId }, ({ profileData }) => {
            userData.set(profileData);

            // Finish login procedure
            loginSucceeded.set(true);
        });
    });
}

export function switchPanel(newPanel: PanelTypes): void {
    let targetPanel: number;

    switch (newPanel) {
        case 'Home':
            targetPanel = 0;
            break;

        case 'Friends':
            targetPanel = 1;
            break;

        case 'Communities':
            targetPanel = 2;
            break;

        case 'Marketplace':
            targetPanel = 3;
            break;
    }

    // Prevent panel spam hogging performance
    if (getKey('panelId') == targetPanel) return;

    setKey('panelId', targetPanel);
    currentPanelId.set(targetPanel);
}

export function showModal(modalName: ModalTypes): void {
    currentModal.set(modalName);
    modalVisible.set(true);
}
