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
import {
    socket,
    lastSendAt as lastSendAtStore,
    lastSendsIn30 as lastSendsIn30Store,
    disabledIn30,
} from 'stores/main';
import { setProgressBar } from './main';
import { differenceInSeconds } from 'date-fns';
import { toast } from 'svelte-sonner';
import { setKey } from './global';

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
    lastSendAt: string,
    lastSendsIn30: number
): void {
    if (lastSendsIn30 >= 12) {
        lastSendsIn30Store.set(-1);
        toast('Try again in 15 minutes.');
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

    if (differenceInSeconds(new Date(), new Date(lastSendAt)) < 1) {
        toast('Slow down.');

        return;
    }

    lastSendAtStore.set(new Date().toString());
    lastSendsIn30Store.set(lastSendsIn30 + 1);

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
    isPRO: boolean,
    lastSendsIn30: number
): Promise<void> {
    if (sendingImage) return;

    lastSendsIn30Store.set(lastSendsIn30 + 3);

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
