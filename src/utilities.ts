import { customFadeDuration, sockt } from "./stores";

// socket-ception
let socket;

sockt.subscribe((val) => {
  socket = val;
});

function animateView(view: HTMLElement, options: Keyframe[], callback: Function): void {
  view.animate(options, customFadeDuration);

  // very callback, much responsive
  if (callback) setTimeout(() => callback(), customFadeDuration);
}

export function animateFadeIn(view: HTMLElement, callback, forceFade?: boolean): void {
  if (!(view.style.display === "block")) view.style.display = "block";
  animateView(view, [{ opacity: 0 }, { opacity: 1 }], callback);
}

export function animateFadeOut(view: HTMLElement, callback) {
  animateView(view, [{ opacity: 1 }, { opacity: 0 }], callback);

  setTimeout(() => {
    view.style.display = "none";
  }, customFadeDuration - 50);
}

export function send(event: string, sendData: string, callback) {
  if (socket) {
    if (sendData) {
      socket.emit(event, sendData, callback);
    } else {
      socket.emit(event, callback);
    }
  }
}

export function isLoggedIn() {
  return new Promise<void>((resolve, reject) => {
    send("isLoggedIn", null, (state) => {
      if (state) resolve();
      else reject();
    });
  });
}
