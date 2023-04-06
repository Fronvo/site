import { writable, type Writable } from 'svelte/store';

interface ThemingOptions {
    // Fronvo branding color
    branding_color: string;

    // Fronvo background color
    bg_color: string;

    // Header text color (accent)
    text_color: string;

    // SideNav background color (accent 2)
    accent_bg_color: string;

    // SideNav shadow color (accent 2.2)
    accent_shadow_color: string;

    // SVG strokes
    svg_stroke: string;

    // Modal background color
    modal_bg_color: string;

    // Modal content background color
    modal_content_bg_color: string;

    // Modal content shadow bg color
    modal_content_shadow_bg_color: string;

    // Modal input background color
    modal_input_bg_color: string;

    // Modal checkbox primary color
    modal_checkbox_primary_color: string;

    // Modal checkbox secondary color
    modal_checkbox_secondary_color: string;

    // Highlighted profile info color
    profile_info_color: string;

    // Target sizes
    modal_header_size: string;
    modal_header_size_850: string;
    modal_input_size: string;
    modal_input_size_850: string;
    modal_button_size: string;
    modal_button_size_850: string;

    // Buttons
    button_background: string;

    // Seperators
    seperator_background: string;

    // MainSideNav
    side_bg_color: string;
    side_svg_bg_color: string;
}

export const defaultTheme: ThemingOptions = {
    branding_color: 'rgb(175, 120, 255)',

    bg_color: 'rgb(30, 30, 30)',

    text_color: 'rgb(225, 225, 225)',

    accent_bg_color: 'rgba(22, 22, 22, 50%)',

    accent_shadow_color: 'rgb(15, 15, 15)',

    svg_stroke: 'rgb(130, 64, 255)',

    modal_bg_color: 'rgba(12, 12, 12, 75%)',

    modal_content_bg_color: 'rgb(20, 20, 20)',

    modal_content_shadow_bg_color: 'rgb(10, 10, 10)',

    modal_input_bg_color: 'rgba(35, 35, 35, 0.5)',

    modal_checkbox_primary_color: 'white',

    modal_checkbox_secondary_color: 'rgb(200, 200, 200)',

    profile_info_color: 'white',

    modal_header_size: '1.5rem',
    modal_header_size_850: '1.1rem',
    modal_input_size: '1.4rem',
    modal_input_size_850: '1.1rem',
    modal_button_size: '1.4rem',
    modal_button_size_850: '1rem',

    button_background: 'rgb(35, 35, 35)',

    seperator_background: 'rgb(40, 40, 40, 50%)',

    side_bg_color: 'rgb(25, 25, 25)',
    side_svg_bg_color: 'rgb(35, 35, 35)',
};

export const whiteTheme: ThemingOptions = {
    branding_color: 'rgb(130, 70, 255)',

    bg_color: 'rgb(250, 250, 250)',

    text_color: 'rgb(60, 60, 60)',

    accent_bg_color: 'rgb(240, 240, 240, 50%)',

    accent_shadow_color: 'rgb(230, 230, 230)',

    svg_stroke: 'rgb(130, 64, 255)',

    modal_bg_color: 'rgba(230, 230, 230, 75%)',

    modal_content_bg_color: 'rgb(250, 250, 250)',

    modal_content_shadow_bg_color: 'rgb(210, 210, 210)',

    modal_input_bg_color: 'rgb(240, 240, 240)',

    modal_checkbox_primary_color: 'var(--profile_info_color)',

    modal_checkbox_secondary_color: 'rgb(90, 90, 90)',

    profile_info_color: 'rgb(40, 40, 40)',

    modal_header_size: '1.5rem',
    modal_header_size_850: '1.1rem',
    modal_input_size: '1.4rem',
    modal_input_size_850: '1.1rem',
    modal_button_size: '1.4rem',
    modal_button_size_850: '1rem',

    button_background: 'rgb(240, 240, 240)',

    seperator_background: 'rgb(240, 240, 240, 25%)',

    side_bg_color: 'rgb(248, 248, 248)',
    side_svg_bg_color: 'rgb(240, 240, 240)',
};

export const currentTheme: Writable<ThemingOptions> = writable(defaultTheme);
