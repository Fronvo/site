import { writable } from "react-use-svelte-store";
import { UserData } from "./types";

export const hasToken = writable<boolean>(false);
export const authenticated = writable<boolean>(false);
export const disconnected = writable<boolean>(false);
export const userData = writable<UserData>();
export const messaging = writable(false);

// For Dialogs
export const updatingProfileNote = writable(false);
