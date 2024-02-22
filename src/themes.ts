import { writable, type Writable } from 'svelte/store';

interface ThemingOptions {
    bg: string;

    // Material-like colors
    primary: string;
    secondary: string;
    tertiary: string;
    gray: string;
    red: string;
    red_hover: string;

    // Text color
    text: string;
    text_gray: string;

    // Modals
    modal_bg: string;
    modal_content_bg: string;
    modal_input_bg: string;
    modal_header_size: string;
    modal_input_size: string;

    // Other
    dropdown: string;
}

export const defaultTheme: ThemingOptions = {
    bg: 'rgb(5, 5, 5)',

    primary: 'rgb(40, 40, 40, 0.25)',
    secondary: 'rgb(40, 40, 40, 0.3)',
    tertiary: 'rgb(40, 40, 40, 0.4)',
    red: 'rgb(231, 2, 2, 0.5)',
    red_hover: 'rgb(231, 2, 2, 0.75)',

    gray: 'rgb(207, 215, 230)',

    text: 'white',
    text_gray: 'rgb(220, 220, 220)',

    // Modals
    modal_bg: 'rgba(4, 4, 4, 65%)',
    modal_content_bg: 'rgb(13, 13, 13)',
    modal_input_bg: 'rgba(25, 25, 25, 0.25)',
    modal_header_size: '1.2rem',
    modal_input_size: '1.2rem',

    // Other
    dropdown: 'rgb(80, 80, 80, 0.25)',
};

export const whiteTheme: ThemingOptions = {
    bg: 'rgb(250, 250, 250)',

    primary: 'rgb(240, 240, 240)',
    secondary: 'rgb(248, 248, 248)',
    tertiary: 'rgb(255, 255, 255)',
    red: 'rgb(231, 2, 2, 0.75)',
    red_hover: 'rgb(231, 2, 2, 1)',

    gray: 'rgb(70, 78, 93)',

    text: 'black',
    text_gray: 'rgb(60, 60, 60)',

    // Modals
    modal_bg: 'rgba(4, 4, 4, 65%)',
    modal_content_bg: 'rgb(190, 190, 190)',
    modal_input_bg: 'rgba(180, 180, 180, 0.25)',
    modal_header_size: '1.2rem',
    modal_input_size: '1.2rem',

    // Other
    dropdown: 'rgb(0, 0, 0, 0.5)',
};

export const currentTheme: Writable<ThemingOptions> = writable(defaultTheme);
