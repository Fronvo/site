import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LastStatus, OnlineStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertStatusToLastStatus(status: OnlineStatus): LastStatus {
  if (status === "Online") return 0;
  else if (status === "Do Not Disturb") return 1;
  else if (status === "Idle") return 2;
  else if (status === "Offline") return 3;
  return 0;
}

export function convertLastStatusToStatus(
  lastStatus: LastStatus
): OnlineStatus {
  if (lastStatus === 0) return "Online";
  else if (lastStatus === 1) return "Do Not Disturb";
  else if (lastStatus === 2) return "Idle";
  else if (lastStatus === 3) return "Offline";
  return "Online";
}

export function normaliseDate(date: string) {
  return date.split("T")[0].replaceAll("-", " ").split(" ").reverse().join("/");
}
