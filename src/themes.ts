import { writable, type Writable } from 'svelte/store';

interface ThemingOptions {
    // Index pages
    i_primary: string;
    i_bg: string;
    i_shadow: string;

    // Material-like colors
    primary: string;

    secondary: string;
    tertiary: string;

    // Gray primaries
    gray: string;
    gray_hover: string;

    // Branding color
    branding: string;
    branding_darken: string;

    // Background color
    bg: string;
    bg_trans: string;

    // Text color
    text: string;
    text_gray: string;
    text_gray_secondary: string;

    // Button backgrounds
    button: string;

    // Not our messages
    message_shadow: string;

    // Posts
    post: string;

    // Modals
    modal_bg: string;

    modal_content_bg: string;

    modal_input_bg: string;

    modal_checkbox_primary: string;
    modal_checkbox_secondary: string;

    modal_header_size: string;
    modal_input_size: string;

    // Other
    scrollbar: string;
    hover_darken: string;
}

export const defaultTheme: ThemingOptions = {
    i_primary: 'rgb(22, 22, 22, 0.25)',
    i_bg: 'rgb(27, 27, 27, 0.5)',
    i_shadow: 'rgb(15, 15, 15)',

    primary: 'rgb(30, 31, 34)',
    secondary: 'rgb(43, 45, 49)',
    tertiary: 'rgb(49, 51, 56)',

    gray: 'rgb(175, 179, 187)',
    gray_hover: 'rgb(207, 215, 230)',

    branding: 'rgb(0, 175, 175)',
    branding_darken: 'rgb(0, 150, 150)',

    bg: 'rgb(20, 20, 20)',
    bg_trans: 'rgb(20, 20, 20, 75%)',

    text: 'rgb(220, 220, 220)',
    text_gray: 'rgb(150, 150, 150)',
    text_gray_secondary: 'rgb(100, 100, 100)',

    button: 'rgb(25, 25, 25)',

    message_shadow: 'rgb(5, 5, 5)',

    post: 'rgb(50, 50, 50, 15%)',

    // Modals
    modal_bg: 'rgba(4, 4, 4, 75%)',

    modal_content_bg: 'rgb(13, 13, 13)',

    modal_input_bg: 'rgba(25, 25, 25, 0.5)',

    modal_checkbox_primary: 'white',

    modal_checkbox_secondary: 'rgb(200, 200, 200)',

    modal_header_size: '1.2rem',
    modal_input_size: '1.2rem',

    scrollbar: 'rgb(60, 60, 60)',

    hover_darken: 'rgb(30, 33, 36)',
};

export const currentTheme: Writable<ThemingOptions> = writable(defaultTheme);
