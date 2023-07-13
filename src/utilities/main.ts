import { goto } from '$app/navigation';
import type {
    FronvoAccount,
    Post,
    Room,
    SwitchedAccount,
} from 'interfaces/all';
import { io } from 'socket.io-client';
import {
    currentDropdownId,
    dropdownAnimationFinished,
    dropdownForAccountInfo,
    dropdownPosition,
    dropdownProfileData,
    DropdownTypes,
    dropdownVisible,
} from 'stores/dropdowns';
import {
    fronvoTitle,
    loginSucceeded,
    progressBarVisible,
    secondarySocket,
    SERVER_URL,
    setSecondarySocket,
    setSocket,
    socket,
} from 'stores/main';
import {
    currentModalId,
    modalAnimDuration,
    ModalTypes,
    modalVisible,
} from 'stores/modals';
import { loadRoomsData } from './rooms';
import { getKey, removeKey, setKey } from './global';
import { loadProfile } from './profile';
import {
    currentRoomData,
    currentRoomId,
    currentRoomLoaded,
    currentRoomMessages,
} from 'stores/rooms';
import { loadHomePosts } from './home';

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
        io(SERVER_URL, {
            transports: ['websocket'],
            path: '/fronvo',
        })
    );

    if (callback) {
        socket.on('connect', callback);
    }

    // Disconnect logic
    socket.on('disconnect', () => {
        currentRoomLoaded.set(false);
        currentRoomId.set(undefined);
        currentRoomData.set(undefined);
        currentRoomMessages.set([]);

        loginSucceeded.set(undefined);

        setTitle('Fronvo');

        socket.off('connect');

        // Able to reconnect once connection has been established
        socket.on('connect', () => {
            modalVisible.set(false);

            performLogin(getKey('token'), []);
        });
    });
}

export function initSecondarySocket(callback?: () => void): void {
    // Only init once, callback discarded
    if (secondarySocket) return;

    setSecondarySocket(
        io(SERVER_URL, {
            transports: ['websocket'],
            path: '/fronvo',
        })
    );

    if (callback) {
        secondarySocket.on('connect', callback);
    }
}

export async function performLogin(
    currentToken: string,
    cachedAccountData: FronvoAccount[]
): Promise<void> {
    return new Promise((resolve) => {
        async function loadAccountData(): Promise<void> {
            let profileData: FronvoAccount;
            let rooms: Room[];
            let homePosts: Post[];

            loadProfile(cachedAccountData).then((data) => {
                profileData = data;
            });

            loadRoomsData().then((convos) => {
                rooms = convos;
            });

            loadHomePosts().then((posts) => {
                homePosts = posts;
            });

            // instead of just using callbacks, login is very fast either way
            const interval = setInterval(() => {
                if (profileData && rooms && homePosts) {
                    loginSucceeded.set(true);
                    clearInterval(interval);
                }
            }, 20);
        }

        socket.emit('isLoggedIn', async ({ loggedIn }) => {
            if (loggedIn) {
                await loadAccountData();

                resolve();
            } else {
                if (!currentToken) {
                    goto('/', {
                        replaceState: true,
                    });
                } else {
                    socket.emit(
                        'loginToken',
                        { token: currentToken },
                        async ({ err }) => {
                            if (!err) {
                                await loadAccountData();

                                resolve();
                            } else {
                                removeKey('token');
                                removeKey('savedAccounts');

                                goto('/', {
                                    replaceState: true,
                                });
                            }
                        }
                    );
                }
            }
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
                    'fetchProfileData',
                    { profileId: id },
                    ({ profileData }) => {
                        resolve(profileData || undefined);
                    }
                );
            });
        }
    });
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

    dropdownProfileData.set(undefined);

    if (!modalStateVisible) {
        if (callback) callback();
    } else {
        // First, dismiss
        modalVisible.set(false);

        // Finally, set timeout to reset for callback
        if (callback) {
            setTimeout(() => {
                callback();
            }, modalAnimDuration + 50);
        }
    }
}

export function showDropdown(
    newPopup: DropdownTypes,
    targetElement: Element,
    direction: 'top' | 'right' | 'left' | 'bottom',
    customLeft?: number,
    customTop?: number
): void {
    dropdownForAccountInfo.set(false);

    dismissDropdown(() => {
        const tempPos = targetElement.getBoundingClientRect();
        if (!customLeft) customLeft = 0;
        if (!customTop) customTop = 0;

        if (direction == 'top') {
            dropdownPosition.set([
                tempPos.left - 40 + customLeft,
                tempPos.top - 55 + customTop,
            ]);
        } else if (direction == 'right') {
            dropdownPosition.set([
                tempPos.left + 40 + customLeft,
                tempPos.top + 15 + customTop,
            ]);
        } else if (direction == 'left') {
            dropdownPosition.set([
                tempPos.left - 340 + customLeft,
                tempPos.top - 15 + customTop,
            ]);
        } else if (direction == 'bottom') {
            dropdownPosition.set([
                tempPos.left - 30 + customLeft,
                tempPos.top + 35 + customTop,
            ]);
        }

        // Set the modal dynamically
        currentDropdownId.set(newPopup);

        // Helpful variable
        dropdownVisible.set(true);

        setTimeout(() => {
            dropdownAnimationFinished.set(true);
        }, 150);
    });
}

export function dismissDropdown(callback?: Function): void {
    if (!dropdownStateVisible) {
        if (callback) callback();
    } else {
        // First, dismiss
        dropdownVisible.set(false);

        if (callback) callback();
    }

    dropdownAnimationFinished.set(false);
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

export function addSavedAccount(
    ourData: FronvoAccount,
    currentToken: string,
    avatar: string,
    username: string,
    token: string
): void {
    const oldKey: SwitchedAccount[] = JSON.parse(getKey('savedAccounts', '[]'));

    // First, add the active account if it's not added
    if (oldKey.length == 0) {
        oldKey.push({
            username: ourData.username,
            avatar: ourData.avatar,
            token: currentToken,
        });
    }

    // Save our progress
    setKey('savedAccounts', JSON.stringify(oldKey));

    // Now, check if the target account has been added already
    for (const savedIndex in oldKey) {
        // If so, no need to do anything
        // Remember to compare tokens, avatars and usernames are malleable
        if (oldKey[savedIndex].token == token) return;
    }

    // If we reached this stage, we can safely add the new account
    oldKey.push({
        username,
        avatar,
        token,
    });

    // Save again
    setKey('savedAccounts', JSON.stringify(oldKey));
}

export function updateSavedAccount(
    avatar: string,
    username: string,
    token: string
): void {
    const oldKey: SwitchedAccount[] = JSON.parse(getKey('savedAccounts', '[]'));
    const newKey: SwitchedAccount[] = [];

    for (const savedIndex in oldKey) {
        // Every index, update the one we want aswell
        if (oldKey[savedIndex].token == token) {
            oldKey[savedIndex].avatar = avatar;
            oldKey[savedIndex].username = username;
        }

        newKey.push(oldKey[savedIndex]);
    }

    setKey('savedAccounts', JSON.stringify(newKey));
}

export function getSavedAccounts(): SwitchedAccount[] {
    return JSON.parse(getKey('savedAccounts', '[]'));
}

export function removeSavedAcount(token: string): void {
    const oldKey: SwitchedAccount[] = JSON.parse(getKey('savedAccounts', '[]'));
    const newKey: SwitchedAccount[] = [];

    for (const savedIndex in oldKey) {
        // All except target token
        if (oldKey[savedIndex].token != token) {
            newKey.push(oldKey[savedIndex]);
        }
    }

    setKey('savedAccounts', JSON.stringify(newKey));
}

export function isAcceptedImage(type: string): boolean {
    return type.includes('image') && !type.includes('svg');
}
