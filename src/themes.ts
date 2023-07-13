import { writable, type Writable } from 'svelte/store';

interface ThemingOptions {
    // Index pages
    i_primary: string;
    i_shadow: string;

    // Material-like colors
    primary: string;
    secondary: string;

    // Branding color
    branding: string;
    branding_darken: string;
    branding_trans: string;

    // Background color
    bg: string;
    bg_trans: string;

    // Text color
    text: string;
    text_gray: string;

    // Button backgrounds
    button: string;

    // Not our messages
    message: string;
    message_shadow: string;

    // Posts
    post: string;

    // Modals
    modal_bg: string;

    modal_content_bg: string;
    modal_content_shadow_bg: string;

    modal_input_bg: string;

    modal_checkbox_primary: string;
    modal_checkbox_secondary: string;

    modal_header_size: string;
    modal_input_size: string;
}

// TODO: ZORIN:     branding: 'rgb(0, 160, 255)',
// branding_darken: 'rgb(0, 140, 255)',

export const defaultTheme: ThemingOptions = {
    i_primary: 'rgb(27, 27, 27)',
    i_shadow: 'rgb(15, 15, 15)',

    primary: 'rgb(45, 45, 45)',
    secondary: 'rgb(60, 60, 60)',

    branding: 'rgb(90, 150, 255)',
    branding_darken: 'rgb(90, 130, 255)',
    branding_trans: 'rgb(90, 150, 255, 10%)',

    bg: 'rgb(30, 30, 30)',
    bg_trans: 'rgb(30, 30, 30, 75%)',

    text: 'rgb(220, 220, 220)',
    text_gray: 'rgb(180, 180, 180)',

    button: 'rgb(35, 35, 35)',

    message: 'rgb(40, 40, 40)',
    message_shadow: 'rgb(15, 15, 15)',

    post: 'rgb(60, 60, 60, 15%)',

    // Modals
    modal_bg: 'rgba(8, 8, 8, 75%)',

    modal_content_bg: 'rgb(20, 20, 20)',

    modal_content_shadow_bg: 'rgb(10, 10, 10)',

    modal_input_bg: 'rgba(35, 35, 35, 0.5)',

    modal_checkbox_primary: 'white',

    modal_checkbox_secondary: 'rgb(200, 200, 200)',

    modal_header_size: '1.3rem',
    modal_input_size: '1.3rem',
};

export const whiteTheme: ThemingOptions = {
    i_primary: 'rgb(245, 245, 245)',
    i_shadow: 'rgb(210, 210, 210)',

    primary: 'rgb(235, 235, 235)',
    secondary: 'rgb(225, 225, 225)',

    branding: 'rgb(0, 130, 255)',
    branding_darken: 'rgb(0, 110, 255)',
    branding_trans: 'rgb(0, 130, 255, 10%)',

    bg: 'rgb(250, 250, 250)',
    bg_trans: 'rgb(250, 250, 250, 75%)',

    text: 'rgb(40, 40, 40)',
    text_gray: 'rgb(100, 100, 100)',

    button: 'rgb(240, 240, 240)',

    message: 'rgb(248, 248, 248)',
    message_shadow: 'rgb(190, 190, 190)',

    post: 'rgb(225, 225, 225, 20%)',

    // Modals
    modal_bg: 'rgba(100, 100, 100, 75%)',

    modal_content_bg: 'rgb(250, 250, 250)',
    modal_content_shadow_bg: 'rgb(210, 210, 210)',

    modal_input_bg: 'rgb(240, 240, 240)',

    modal_checkbox_primary: 'var(--text)',
    modal_checkbox_secondary: 'rgb(90, 90, 90)',

    modal_header_size: '1.3rem',
    modal_input_size: '1.3rem',
};

export const currentTheme: Writable<ThemingOptions> = writable(defaultTheme);
