import type { FronvoAccount, Room, RoomMessage } from 'interfaces/all';
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
} from 'stores/rooms';
import { socket } from 'stores/main';
import { setProgressBar } from './main';
export async function fetchConvos(): Promise<Room[]> {
    return new Promise((resolve) => {
        socket.emit('fetchConvos', ({ convos }) => {
            resolve(convos);
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
            'fetchRoomMessages',
            {
                roomId,
                from: '0',
                to: '40',
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

    // Load convos data
    const convos = await fetchConvos();

    roomsList.set(convos);

    return convos;
}

export function sendMessage(
    roomId: string,
    content: string,
    replyingToP: string,
    replyingToIdP: string
): void {
    socket.emit('sendRoomMessage', {
        roomId,
        message: content,
        replyId: replyingToP ? replyingToIdP : '',
    });

    // Reset params
    sendContent.set('');
    replyingTo.set(undefined);
    replyingToId.set(undefined);
}

export async function sendImage(
    roomId: string,
    sendingImage: boolean,
    file: any
): Promise<void> {
    if (sendingImage) return;

    sendingImageStore.set(true);
    setProgressBar(true);

    const attachment = await (
        await fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify({
                file,
                noTransform: true,
            }),
        })
    ).json();

    socket.emit(
        'sendRoomImage',
        {
            roomId,
            attachment,
        },
        () => {
            setProgressBar(false);
            sendingImageStore.set(false);
        }
    );
}
