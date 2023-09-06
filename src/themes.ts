import { writable, type Writable } from 'svelte/store';

interface ThemingOptions {
    // Index pages
    i_primary: string;
    i_bg: string;
    i_shadow: string;

    // Material-like colors
    primary: string;
    secondary: string;

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

    // PRO
    pro: string;
    pro_darken: string;

    // Other
    scrollbar: string;
}

export const defaultTheme: ThemingOptions = {
    i_primary: 'rgb(22, 22, 22)',
    i_bg: 'rgb(27, 27, 27, 0.5)',
    i_shadow: 'rgb(15, 15, 15)',

    primary: 'rgb(30, 30, 30)',
    secondary: 'rgb(45, 45, 45)',

    branding: 'rgb(90, 150, 255)',
    branding_darken: 'rgb(90, 130, 255)',

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

    pro: 'rgb(0, 175, 175)',
    pro_darken: 'rgb(0, 150, 150)',

    scrollbar: 'rgb(60, 60, 60)',
};

export const whiteTheme: ThemingOptions = {
    i_primary: 'rgb(245, 245, 245)',
    i_bg: 'rgb(240, 240, 240)',
    i_shadow: 'rgb(210, 210, 210)',

    primary: 'rgb(240, 240, 240)',
    secondary: 'rgb(225, 225, 225)',

    branding: 'rgb(0, 130, 255)',
    branding_darken: 'rgb(0, 110, 255)',

    bg: 'rgb(250, 250, 250)',
    bg_trans: 'rgb(250, 250, 250, 75%)',

    text: 'rgb(40, 40, 40)',
    text_gray: 'rgb(100, 100, 100)',
    text_gray_secondary: 'rgb(100, 100, 100)',

    button: 'rgb(240, 240, 240)',

    message_shadow: 'rgb(190, 190, 190)',

    post: 'rgb(225, 225, 225, 20%)',

    // Modals
    modal_bg: 'rgba(100, 100, 100, 75%)',

    modal_content_bg: 'rgb(250, 250, 250)',

    modal_input_bg: 'rgb(240, 240, 240)',

    modal_checkbox_primary: 'var(--text)',
    modal_checkbox_secondary: 'rgb(90, 90, 90)',

    modal_header_size: '1.2rem',
    modal_input_size: '1.2rem',

    pro: 'rgb(0, 200, 200)',
    pro_darken: 'rgb(0, 185, 185)',

    scrollbar: 'rgb(180, 180, 180)',
};

export const currentTheme: Writable<ThemingOptions> = writable(defaultTheme);
