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
import { socket, lastSendAt as lastSendAtStore } from 'stores/main';
import { setProgressBar } from './main';
import { differenceInSeconds } from 'date-fns';
import { toast } from 'svelte-sonner';

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
    replyingToIdP: string,
    lastSendAt: string
): void {
    if (content.trim().length == 0) return;

    if (differenceInSeconds(new Date(), new Date(lastSendAt)) < 1) {
        toast('Slow down.');

        return;
    }

    lastSendAtStore.set(new Date().toString());

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

export async function uploadImage(file: any, isPRO: boolean): Promise<string> {
    return await (
        await fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify({
                file,
                noTransform: true,
                isPRO,
            }),
        })
    ).json();
}

export async function sendImage(
    roomId: string,
    sendingImage: boolean,
    file: any,
    isPRO: boolean
): Promise<void> {
    if (sendingImage) return;

    sendingImageStore.set(true);
    setProgressBar(true);

    socket.emit(
        'sendRoomImage',
        {
            roomId,
            attachment: await uploadImage(file, isPRO),
        },
        () => {
            setProgressBar(false);
            sendingImageStore.set(false);
        }
    );
}
