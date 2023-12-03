import type { FronvoAccount, Room, RoomMessage, Server } from 'interfaces/all';
import {
    sendContent,
    replyingTo,
    replyingToId,
    currentRoomData,
    currentRoomMessages,
    roomsList,
    currentRoomId,
    currentRoomLoaded,
    sendingImage as sendingImageStore,
    dmsList,
    isInServer,
    serversList,
} from 'stores/rooms';
import {
    socket,
    lastSendAt as lastSendAtStore,
    lastSendsIn30 as lastSendsIn30Store,
    disabledIn30,
} from 'stores/main';
import { differenceInSeconds } from 'date-fns';
import { setKey } from './global';

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

export async function loadRoomMessages(roomId: string): Promise<
    {
        message: RoomMessage;
        profileData: FronvoAccount;
    }[]
> {
    return new Promise((resolve) => {
        socket.emit(
            'fetchMessages',
            {
                roomId,
                from: '0',
                to: '50',
            },
            ({ roomMessages }) => resolve(roomMessages)
        );
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

    const dms: Room[] = [];
    const rooms: Room[] = [];

    for (const convoObj in convos) {
        const convo = convos[convoObj];

        if (convo.isDM) {
            dms.push(convo);
        } else {
            rooms.push(convo);
        }
    }

    // Re-init because we can't dynamically update
    dmsList.set(dms);
    roomsList.set(rooms);

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
    lastSendsIn30: number
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

    socket.emit('sendMessage', {
        roomId,
        message: content,
        replyId: replyingToP ? replyingToIdP : '',
    });

    // Reset params
    sendContent.set('');
    replyingTo.set(undefined);
    replyingToId.set(undefined);
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
    lastSendsIn30: number
): Promise<void> {
    if (sendingImage) return;

    lastSendsIn30Store.set(lastSendsIn30 + 3);

    sendingImageStore.set(true);

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
}
