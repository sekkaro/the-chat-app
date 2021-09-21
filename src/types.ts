export type Location = {
  latitude: number;
  longitude: number;
};

export interface MessageType {
  text: string;
  createdAt: number;
  username: string;
}

export interface LocationMessageType {
  url: string;
  createdAt: number;
  username: string;
}

export interface UserType {
  id: string;
  username: string;
  room: string;
}

export type UserReturn = {
  user?: UserType;
  error?: string;
};
