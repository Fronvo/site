import { writable } from 'svelte/store';

/****************************** Settings ******************************/
export const accountPanelAnimDuration = 350;
/****************************** Settings ******************************/

/****************************** Register ******************************/
export const accountRegisterTab = writable(false);
export const accountRegisterVerifyTab = writable(false);
export const accountRegisterFinalTab = writable(false);
/****************************** Register ******************************/

/****************************** Reset Password ******************************/
export const accountResetPasswordTab = writable(false);
export const accountResetPasswordVerifyTab = writable(false);
export const accountResetPasswordFinalTab = writable(false);
/****************************** Reset Password ******************************/
