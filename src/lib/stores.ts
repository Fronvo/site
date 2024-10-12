import { writable } from "react-use-svelte-store";
import { Channel, Server, UserData } from "./types";

export const hasToken = writable<boolean>(false);
export const authenticated = writable<boolean>(false);
export const disconnected = writable<boolean>(false);
export const userData = writable<UserData>();
export const serverData = writable<Server>();
export const channelData = writable<Channel>();
export const editingChannelData = writable<Channel>();
export const deletingChannelData = writable<Channel>();
export const appVersion = writable<string>();
export const messaging = writable(false);

// For Dialogs
export const updatingProfileNote = writable(false);
export const sharingPost = writable(false);
export const settingsOpen = writable(false);
export const switchingAccounts = writable(false);
export const loggingOut = writable(false);
export const changingPassword = writable(false);
export const deletingAccount = writable(false);
export const requestingData = writable(false);
export const creatingServer = writable(false);
export const joiningServer = writable(false);
export const editingServer = writable(false);
export const deletingServer = writable(false);
export const leavingServer = writable(false);
export const creatingChannel = writable(false);
export const editingChannel = writable(false);
export const deletingChannel = writable(false);
export const managingMembers = writable(false);
export const banningMembers = writable(false);
