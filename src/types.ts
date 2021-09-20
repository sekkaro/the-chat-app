export type Location = {
  latitude: number;
  longitude: number;
};

export interface MessageType {
  text: string;
  createdAt: number;
}

export interface LocationMessageType {
  url: string;
  createdAt: number;
}
