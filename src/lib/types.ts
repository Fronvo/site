export interface UserData {
  profile_id: string;
  username: string;
  avatar: string;
  email: string;
  created_at: string;
  status: LastStatus;
  note: string;
}

export type LastStatus = 0 | 1 | 2 | 3;

export type OnlineStatus = "Online" | "Do Not Disturb" | "Idle" | "Offline";
