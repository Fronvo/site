import { sockt, selfDict, animationSensitivityX, animationSensitivityY } from './stores';

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
    return new Promise((resolve, reject) => {
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


// UI-related
export function updateTextShadows(event) {
    if(!event) return;

    const newShadowX = (event.clientX * animationSensitivityX) - 3;
    const newShadowY = (event.clientY * animationSensitivityY) - 5;

    const newTextShadow = newShadowX + 'px ' + newShadowY + 'px 0 rgb(0, 0, 0)';

    const elementsToAnimate = document.getElementsByClassName('shadow-animated');

    for(let element in elementsToAnimate) {
        try {
            elementsToAnimate[element].style.textShadow = newTextShadow;
        } catch(e) {}
    }
}
