import { writable, type Writable } from 'svelte/store';

interface ThemingOptions {
    // Fronvo background color
    bg_color: string;

    // Header text color (accent)
    text_color: string;

    // SideNav background color (accent 2)
    nav_bg_color: string;

    // SideNav shadow color (accent 2.2)
    nav_shadow_color: string;

    // SVG strokes
    svg_stroke: string;

    // Modal background color
    modal_bg_color: string;

    // Modal background color for no transparency
    modal_bg_color_full: string;

    // Modal input background color
    modal_input_bg_color: string;

    // Highlighted profile info color
    profile_info_color: string;
}

export const defaultTheme: ThemingOptions = {
    bg_color: 'rgb(30, 30, 30)',

    text_color: 'rgb(180, 120, 255)',

    nav_bg_color: 'rgba(20, 20, 20, 0.75)',

    nav_shadow_color: 'black',

    svg_stroke: 'rgb(130, 64, 255)',

    modal_bg_color: 'rgba(10, 10, 10, 85%)',

    modal_bg_color_full: 'rgb(10, 10, 10, 100%)',

    modal_input_bg_color: 'rgba(40, 40, 40, 0.5)',

    profile_info_color: 'white',
};

export const whiteTheme: ThemingOptions = {
    bg_color: 'rgb(250, 250, 250)',

    text_color: 'rgb(150, 100, 250)',

    nav_bg_color: 'white',

    nav_shadow_color: 'rgb(220, 220, 220)',

    svg_stroke: 'rgb(130, 64, 255)',

    modal_bg_color: 'rgba(230, 230, 230, 85%)',

    modal_bg_color_full: 'rgb(230, 230, 230)',

    modal_input_bg_color: 'rgba(255, 255, 255, 50%)',

    profile_info_color: 'rgb(40, 40, 40)',
};

export const currentTheme: Writable<ThemingOptions> = writable(defaultTheme);
