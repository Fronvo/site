import type { FronvoAccount, Room, RoomMessage, Server } from 'interfaces/all';
import {
    sendContent,
    replyingTo,
    replyingToId,
    currentRoomData,
    currentRoomMessages,
    currentRoomId,
    currentRoomLoaded,
    sendingImage as sendingImageStore,
    dmsList,
    isInServer,
    serversList,
    currentServer,
    currentChannel,
    cachedRooms as cachedRoomsStore,
    pendingMessages as pendingMessagesStore,
} from 'stores/rooms';
import {
    socket,
    lastSendAt as lastSendAtStore,
    lastSendsIn30 as lastSendsIn30Store,
    disabledIn30,
} from 'stores/main';
import { differenceInSeconds } from 'date-fns';
import { setKey } from './global';
import type { FetchedMessage } from 'interfaces/account/fetchMessages';

export async function fetchConvos(): Promise<Room[]> {
    return new Promise((resolve) => {
        socket.emit('fetchConvos', ({ convos }) => {
            resolve(convos);
        });
    });
}

export async function fetchServers(): Promise<Server[]> {
    return new Promise((resolve) => {
        socket.emit('fetchServers', ({ servers }) => {
            resolve(servers);
        });
    });
}

export async function loadRoomsData(): Promise<Room[]> {
    currentRoomId.set(undefined);
    currentRoomData.set(undefined);
    currentRoomMessages.set([]);
    currentRoomLoaded.set(false);
    isInServer.set(false);

    // Load convos data
    const convos = await fetchConvos();

    // Re-init because we can't dynamically update
    dmsList.set(convos);

    return convos;
}

export async function loadServersData(): Promise<Server[]> {
    // Load servers data
    const servers = await fetchServers();

    const tempServerList: Server[] = [];

    for (const serverObj in servers) {
        const server = servers[serverObj];

        tempServerList.push(server);
    }

    // Re-init because we can't dynamically update
    serversList.set(tempServerList);

    return servers;
}

export function sendMessage(
    roomId: string,
    content: string,
    replyingToP: string,
    replyingToIdP: string,
    lastSendAt: string,
    lastSendsIn30: number,
    messages: FetchedMessage[],
    pendingMessages: string[],
    ourData: FronvoAccount,
    serverId?: string
): void {
    if (lastSendsIn30 >= 12) {
        lastSendsIn30Store.set(-1);
        sendContent.set('');

        setKey('disabledIn30Time', new Date());
        disabledIn30.set(true);

        setTimeout(() => {
            lastSendsIn30Store.set(0);
            disabledIn30.set(false);
        }, 60 * 15 * 10);

        return;
    }

    if (content.trim().length == 0) return;

    if (differenceInSeconds(new Date(), new Date(lastSendAt)) < 0.25) {
        return;
    }

    lastSendAtStore.set(new Date().toString());
    lastSendsIn30Store.set(lastSendsIn30 + 1);

    if (!serverId) {
        socket.emit('sendMessage', {
            roomId,
            message: content,
            replyId: replyingToP ? replyingToIdP : '',
        });
    } else {
        socket.emit('sendChannelMessage', {
            serverId,
            channelId: roomId,
            message: content,
            replyId: replyingToP ? replyingToIdP : '',
        });
    }

    // Reset params
    sendContent.set('');
    replyingTo.set(undefined);
    replyingToId.set(undefined);

    messages.push({
        message: {
            messageId: '',
            ownerId: ourData.profileId,
            content,
            creationDate: new Date().toString(),
            isImage: false,
            isReply: replyingToP ? true : false,
            replyContent: '',
        },
        profileData: ourData,
    });

    pendingMessages.push(content);
    pendingMessagesStore.set(pendingMessages);
}

export async function uploadImage(
    file: any,
    isPRO: boolean,
    width?: number,
    height?: number
): Promise<string> {
    return await (
        await fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify({
                file,
                noTransform: !width && !height,
                isPRO,
                width,
                height,
            }),
        })
    ).json();
}

export async function sendImage(
    roomId: string,
    sendingImage: boolean,
    file: any,
    isPRO: boolean,
    lastSendsIn30: number,
    serverId?: string
): Promise<void> {
    if (sendingImage) return;

    lastSendsIn30Store.set(lastSendsIn30 + 3);

    sendingImageStore.set(true);

    if (!serverId) {
        socket.emit(
            'sendImage',
            {
                roomId,
                attachment: await uploadImage(file, isPRO),
            },
            () => {
                sendingImageStore.set(false);
            }
        );
    } else {
        socket.emit(
            'sendChannelImage',
            {
                serverId,
                channelId: roomId,
                attachment: await uploadImage(file, isPRO),
            },
            () => {
                sendingImageStore.set(false);
            }
        );
    }
}

export function goHome(): void {
    currentRoomId.set(undefined);
    currentRoomData.set(undefined);
    currentRoomMessages.set([]);
    currentRoomLoaded.set(false);
    isInServer.set(false);
    currentServer.set(undefined);
    currentChannel.set(undefined);
}

export async function getRoomMessages(
    roomId: string,
    currentMessagesLength: number,
    serverId?: string
): Promise<FetchedMessage[]> {
    return new Promise((resolve) => {
        if (!serverId) {
            socket.emit(
                'fetchMessages',
                {
                    roomId: roomId,
                    from: currentMessagesLength.toString(),
                    to: (currentMessagesLength + 50).toString(),
                },
                ({ roomMessages }) => {
                    resolve(roomMessages);

                    return;
                }
            );
        } else {
            socket.emit(
                'fetchChannelMessages',
                {
                    serverId,
                    channelId: roomId,
                    from: currentMessagesLength.toString(),
                    to: (currentMessagesLength + 50).toString(),
                },
                ({ channelMessages }) => {
                    resolve(channelMessages);

                    return;
                }
            );
        }
    });
}

export function getCachedMessages(
    roomId: string,
    cachedRooms: { [roomId: string]: FetchedMessage[] }
): FetchedMessage[] {
    // Loop over cached rooms, boom
    for (const roomIdTemp in cachedRooms) {
        if (roomIdTemp == roomId) {
            return cachedRooms[roomIdTemp];
        }
    }

    // beep boop boop beep, signal to cache new room
    // dont return [], undefined means no key
}

export function updateCachedMessages(
    roomId: string,
    messages: FetchedMessage[],
    cachedRooms: { [roomId: string]: FetchedMessage[] }
): void {
    // Just update, dont care about other messages in cache
    cachedRooms[roomId] = messages;

    cachedRoomsStore.set(cachedRooms);
}

export function pushCachedMessage(
    roomId: string,
    message: FetchedMessage,
    cachedRooms: { [roomId: string]: FetchedMessage[] }
): void {
    for (const roomIdTemp in cachedRooms) {
        if (roomIdTemp == roomId) {
            cachedRooms[roomIdTemp].push(message);

            cachedRoomsStore.set(cachedRooms);
            break;
        }
    }
}

export function removeCachedMessage(
    roomId: string,
    messageId: string,
    cachedRooms: { [roomId: string]: FetchedMessage[] }
): void {
    for (const roomIdTemp in cachedRooms) {
        if (roomIdTemp == roomId) {
            const room = cachedRooms[roomIdTemp];
            const newMessages: FetchedMessage[] = [];

            for (const messageIndex in cachedRooms[roomIdTemp]) {
                if (room[messageIndex].message.messageId != messageId) {
                    newMessages.push(room[messageIndex]);
                }
            }

            cachedRooms[roomIdTemp] = newMessages;

            cachedRoomsStore.set(cachedRooms);
            break;
        }
    }
}

export function isRoomCached(
    roomId: string,
    cachedRooms: { [roomId: string]: FetchedMessage[] }
): boolean {
    return roomId in cachedRooms;
}

export function removePendingMessage(
    content: string,
    pendingMessages: string[]
): void {
    const newPending: string[] = [];

    for (const pendingIndex in pendingMessages) {
        const pending = pendingMessages[pendingIndex];

        if (pending != content) {
            newPending.push(pending);
        }
    }

    pendingMessagesStore.set(newPending);
}

export async function findAccountDMId(
    profileId: string,
    dmsList: Room[]
): Promise<string> {
    return new Promise((resolve) => {
        for (const dmIndex in dmsList) {
            const dm = dmsList[dmIndex];

            if (dm.dmUser.profileId == profileId) {
                resolve(dm.roomId);

                return;
            }
        }

        socket.emit(
            'createDM',
            {
                profileId,
            },
            ({ roomId }) => {
                if (roomId) {
                    resolve(roomId);
                    return;
                }
            }
        );
    });
}
