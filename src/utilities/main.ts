import { goto } from '$app/navigation';
import type { FronvoAccount, AccountPost } from 'interfaces/all';
import { io } from 'socket.io-client';
import {
    currentDropdownId,
    dropdownAnimDuration,
    DropdownTypes,
    dropdownVisible,
} from 'stores/dropdowns';
import {
    fronvoTitle,
    guestMode,
    loginSucceeded,
    progressBarVisible,
    setSocket,
    socket,
} from 'stores/main';
import {
    currentModalId,
    modalAnimDuration,
    modalInput,
    ModalTypes,
    modalVisible,
} from 'stores/modals';
import { PanelTypes, currentPanelId } from 'stores/panels';
import { loadCommunitiesData } from './communities';
import { getKey, removeKey } from './global';
import { loadHomePosts } from './home';
import { loadOurProfile, loadTargetProfile } from './profile';

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

export function initSocket(callback?: () => void): void {
    // Only init once, callback discarded
    if (socket) return;

    setSocket(
        io('wss://fronvosrv.fly.dev', {
            transports: ['websocket'],
            path: '/fronvo',
        })
    );

    if (callback) {
        socket.on('connect', callback);
    }
}

export async function performLogin(
    pendingSearchId: string,
    cachedData: FronvoAccount[]
): Promise<void> {
    ////////// Strucure //////////

    // 1. Check if we have already logged in to prevent multiple function calls

    // 2. If we have already logged in, resolve, load immediately and return

    // 3. If we haven't logged in, check if we have a token saved locally

    // 4. If we don't, set ourselves to guest mode and indicate that the login hasn't succeeded and return

    // 5. If we do, attempt to login with it

    // 6. If there's no error, disable guest mode and indicate that the login has succeeded, load and return

    // 7. If the token is invalid or something similar, remove it and do the rest as step number 4

    ////////// Strucure //////////

    return new Promise((resolve) => {
        async function loadAccountData(): Promise<void> {
            const ourData = await loadOurProfile(cachedData);

            await loadCommunitiesData(ourData);
            await loadHomePosts();

            await updateSearch();

            guestMode.set(false);
            loginSucceeded.set(true);
        }

        async function loadGuestData(): Promise<void> {
            await loadHomePosts();

            if (pendingSearchId) {
                await updateSearch();
            } else {
                goto('/home', {
                    replaceState: true,
                });
            }

            guestMode.set(true);
            loginSucceeded.set(false);
        }

        async function updateSearch(): Promise<void> {
            if (pendingSearchId) {
                await loadTargetProfile(pendingSearchId, cachedData);
            }
        }

        // 1. Check if we have already logged in to prevent multiple function calls
        socket.emit('isLoggedIn', async ({ loggedIn }) => {
            // 2. If we have already logged in, resolve, load immediately and return
            if (loggedIn) {
                await loadAccountData();

                resolve();
                return;
            }

            // 3. If we haven't logged in, check if we have a token saved locally

            // 4. If we don't, set ourselves to guest mode and indicate that the login hasn't succeeded and return
            if (!getKey('token')) {
                await loadGuestData();

                resolve();
                return;
            }

            // 5. If we do, attempt to login with it
            socket.emit(
                'loginToken',
                { token: getKey('token') },
                async ({ err }) => {
                    // 6. If there's no error, disable guest mode and indicate that the login has succeeded, load and return
                    if (!err) {
                        await loadAccountData();

                        resolve();
                        return;
                    }

                    // 7. If the token is invalid or something similar, remove it and do the rest as step number 4
                    removeKey('token');

                    await loadGuestData();

                    goto('/home', {
                        replaceState: true,
                    });
                    resolve();
                }
            );
        });
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
            { profileId, from: '0', to: '10' },
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

        // Then, reset modalInput
        modalInput.set(undefined);

        // Finally, set timeout to reset for callback
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

export async function findCachedAccount(
    profileId: string,
    cachedData: FronvoAccount[]
): Promise<FronvoAccount> {
    for (const accountIndex in cachedData) {
        const targetAccount = cachedData[accountIndex];

        if (targetAccount.profileId == profileId) {
            return targetAccount;
        }
    }

    // Not found in cache, create and return
    return await updateCachedAccount(profileId, cachedData);
}

export async function updateCachedAccount(
    profileId: string,
    cachedData: FronvoAccount[],
    defaultValue?: FronvoAccount
): Promise<FronvoAccount | undefined> {
    let accountFound = false;
    let accountIndex = -1;

    for (const accountIndexNum in cachedData) {
        const targetAccount = cachedData[accountIndexNum];

        if (targetAccount.profileId == profileId) {
            accountFound = true;
            accountIndex = Number(accountIndexNum);
            break;
        }
    }

    const tempCachedData = cachedData || [];

    // Remove old entry
    if (accountFound) {
        tempCachedData.splice(Number(accountIndex), 1);
    }

    // Will also create / use default if not found, used in findCachedAccount
    let newData: FronvoAccount;

    if (defaultValue) {
        newData = defaultValue;
    } else {
        newData = await fetchUser(profileId);
    }

    // Might be an invalid profile, ignore
    if (newData) {
        tempCachedData.push(newData);
    }

    return newData;
}

export function getTimeDifferenceM(endDate: Date, startDate: Date): number {
    return Math.abs(
        Math.round((endDate.getTime() - startDate.getTime()) / 1000 / 60)
    );
}
