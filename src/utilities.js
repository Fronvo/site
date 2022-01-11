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

// TODO: Convert to getProfileData once friends functionality is implemented
export function gatherLoginData() {
    return new Promise(async (resolve, reject) => {
        send('fetchProfileId', null, (profileId) => {
            send('fetchProfileData', {
                profileId: profileId
            }, (err, profileDataDict) => {
                if(err) {
                    reject();
                    return;
                }

                selfDict.set({...profileDataDict});
                resolve();
            });
        });
    });
}
