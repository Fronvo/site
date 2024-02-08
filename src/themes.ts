import { writable, type Writable } from 'svelte/store';

interface ThemingOptions {
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
}

export const defaultTheme: ThemingOptions = {
    primary: 'rgb(255, 255, 255, 0.075)',
    secondary: 'rgb(255, 255, 255, 0.1)',
    tertiary: 'rgb(255, 255, 255, 0.15)',
    red: 'rgb(231, 2, 2, 0.25)',
    red_hover: 'rgb(231, 2, 2, 0.5)',

    gray: 'rgb(207, 215, 230)',

    text: 'white',
    text_gray: 'rgb(150, 150, 150)',

    // Modals
    modal_bg: 'rgba(4, 4, 4, 65%)',
    modal_content_bg: 'rgb(13, 13, 13)',
    modal_input_bg: 'rgba(25, 25, 25, 0.25)',
    modal_header_size: '1.2rem',
    modal_input_size: '1.2rem',
};

export const currentTheme: Writable<ThemingOptions> = writable(defaultTheme);
