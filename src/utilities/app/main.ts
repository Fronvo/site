// ******************** //
// Reusable functions for the app route, after login.
// ******************** //

import type { AccountPost, FronvoAccount } from 'interfaces/app/main';
import { tokenInvalid } from 'stores/app/global';
import {
    currentModalId,
    currentPanelId,
    loginSucceeded,
    modalAnimDuration,
    modalVisible,
} from 'stores/app/main';
import { userPosts } from 'stores/app/profile';
import { socket } from 'stores/global';
import type { ModalTypes, PanelTypes } from 'types/app/main';
import { getKey, removeKey, setKey } from 'utilities/global';

// Preserve modal state
let modalStateVisible: boolean;

setTimeout(() => {
    modalVisible.subscribe((state) => {
        modalStateVisible = state;
    });
}, 0);

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
                    loginSucceeded.set(true);
                }
            });
        } else {
            // Already logged in, skip manual login
            loginSucceeded.set(true);
        }
    });
}

export async function fetchUser(id?: string): Promise<FronvoAccount> {
    // If no id, fetch self
    return new Promise(async (resolve, reject) => {
        if (!id) {
            // Fetch our id first
            socket.emit('fetchProfileId', async ({ profileId, err }) => {
                err && reject(err);

                await fetchData(profileId);
            });
        } else {
            await fetchData(id);
        }

        async function fetchData(id: string): Promise<FronvoAccount> {
            return new Promise(() => {
                socket.emit(
                    'fetchProfileData',
                    { profileId: id },
                    ({ profileData, err }) => {
                        err && reject(err);

                        resolve(profileData);
                    }
                );
            });
        }
    });
}

export async function fetchPosts(
    profileId: string,
    from: string,
    to: string
): Promise<AccountPost[]> {
    return new Promise(async (resolve) => {
        socket.emit(
            'fetchProfilePosts',
            { profileId, from, to },
            ({ err, profilePosts }) => {
                err && userPosts.set([]);

                resolve(profilePosts);
            }
        );
    });
}

export function switchPanel(newPanel: PanelTypes): void {
    // Prevent panel spam hogging performance
    // TODO: Find a workaround to click on profile and reload if not ours
    if (getKey('panelId') == newPanel) return;

    // Update panelId for future page reloads
    setKey('panelId', newPanel);

    // Set the panel dynamically
    currentPanelId.set(newPanel);
}

export function showModal(newModal: ModalTypes): void {
    dismissModal(() => {
        // Set the modal dynamically
        currentModalId.set(newModal);

        // Helpful variable
        modalVisible.set(true);
    });
}

export function dismissModal(callback?: Function): void {
    if (!modalStateVisible) {
        if (callback) callback();
    } else {
        // First, dismiss
        modalVisible.set(false);

        // Then, set timeout to reset for callback
        if (callback) {
            setTimeout(() => {
                callback();
            }, modalAnimDuration + 50);
        }
    }
}
