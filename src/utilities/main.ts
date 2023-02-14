// ******************** //
// Reusable functions for the app route, after login.
// ******************** //

import type { AccountPost, FronvoAccount } from 'interfaces/all';
import { fronvoTitle, socket } from 'stores/all';
import {
    currentDropdownId,
    currentModalId,
    currentPanelId,
    dropdownAnimDuration,
    dropdownVisible,
    loginSucceeded,
    modalAnimDuration,
    modalVisible,
    progressBarVisible,
} from 'stores/main';
import type { DropdownTypes, ModalTypes, PanelTypes } from 'types/main';
import { getKey, removeKey } from './global';

// Preserve modal state
let modalStateVisible: boolean;
let dropdownStateVisible: boolean;

setTimeout(() => {
    if (!modalVisible) return;

    modalVisible.subscribe((state) => {
        modalStateVisible = state;
    });
}, 0);

setTimeout(() => {
    if (!dropdownVisible) return;

    dropdownVisible.subscribe((state) => {
        dropdownStateVisible = state;
    });
}, 0);

export function performLogin(): void {
    // Get current login state
    socket.emit('isLoggedIn', ({ loggedIn }) => {
        // If not logged in, attempt to login with stored token
        if (!loggedIn && getKey('token')) {
            socket.emit('loginToken', { token: getKey('token') }, ({ err }) => {
                // If the login failed, reset token and redirect to accounts
                if (err) {
                    removeKey('token');
                    loginSucceeded.set(false);
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
    return new Promise(async (resolve) => {
        if (!id) {
            // Fetch our id first
            socket.emit('fetchProfileId', async ({ profileId }) => {
                await fetchData(profileId);
            });
        } else {
            await fetchData(id);
        }

        async function fetchData(
            id: string
        ): Promise<FronvoAccount | undefined> {
            return new Promise(() => {
                socket.emit(
                    `fetchProfileData${!getKey('token') ? 'Guest' : ''}`,
                    { profileId: id },
                    ({ profileData }) => {
                        resolve(profileData || undefined);
                    }
                );
            });
        }
    });
}

export async function fetchPosts(profileId: string): Promise<AccountPost[]> {
    return new Promise(async (resolve) => {
        socket.emit(
            'fetchProfilePosts',
            { profileId, from: '0', to: '5' },
            ({ profilePosts }) => {
                resolve(profilePosts || []);
            }
        );
    });
}

export function switchPanel(newPanel: PanelTypes): void {
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
    // Pending operations
    setProgressBar(false);

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

export function showDropdown(newPopup: DropdownTypes): void {
    dismissDropdown(() => {
        // Set the modal dynamically
        currentDropdownId.set(newPopup);

        // Helpful variable
        dropdownVisible.set(true);
    });
}

export function dismissDropdown(callback?: Function): void {
    if (!dropdownStateVisible) {
        if (callback) callback();
    } else {
        // First, dismiss
        dropdownVisible.set(false);

        // Then, set timeout to reset for callback
        if (callback) {
            setTimeout(() => {
                callback();
            }, dropdownAnimDuration + 50);
        }
    }
}

export function setTitle(title: string): void {
    fronvoTitle.set(title);
}

export function setProgressBar(state: boolean): void {
    progressBarVisible.set(state);
}

export function findCachedAccount(
    profileId: string,
    cachedData: FronvoAccount[]
): FronvoAccount | undefined {
    for (const accountIndex in cachedData) {
        const targetAccount = cachedData[accountIndex];

        if (targetAccount.profileId == profileId) {
            return targetAccount;
        }
    }
}
