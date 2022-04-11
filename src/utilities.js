// ******************** //
// Reusable functions for all kinds of files.
// ******************** //

import { animationSensitivityX, animationSensitivityY } from './stores';

// For the 'shadow-animated' class elements
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
