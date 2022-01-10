import { sockt, selfDict } from './stores';

// socket-ception
let socket;

sockt.subscribe((val) => {
    socket = val;
});

export function send(event, sendData, callback) {
    if(socket) {
        if(sendData) {
            socket.emit(event, sendData, callback);
        } else {
            socket.emit(event, callback);
        }
    }
}

export function isLoggedIn() {
    return new Promise((resolve, reject) => {
        send('isLoggedIn', null, (state) => {
            if(state) resolve();
            else reject();
        })
    });
}

export function gatherLoginData() {
    return new Promise(async (resolve, reject) => {
        send('fetchSelfData', null, (selfDataDict) => {
            selfDict.set({...selfDataDict});
            resolve();
        });
    });
}
