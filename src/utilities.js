import { goto } from '$app/navigation';
import { timeoutDelay, customFadeDuration } from './stores';

export function timeoutRedirect(socket) {
    setTimeout(() => {
        if(!socket.connected) goto('/');
    }, timeoutDelay);
}

export function attemptType(socket, type, email, password) {
    return new Promise((resolve, reject) => {
        if(!socket || !type) { reject(); return; }
        
        socket.emit(type, {
            email: email,
            password: password
        }, (err, token) => {
            if(err) reject(err);
            else resolve(token);
        });
    });
}

export function isLoggedIn(socket) {
    return new Promise((resolve, reject) => {
        if(!socket) { reject(); return; }

        socket.emit('isLoggedIn', (state) => {
            if(state) resolve();
            else reject();
        });
    });
}

export function animateFadeIn(view) {
    view.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], customFadeDuration);
}
