import { LocationMessageType, MessageType } from "./types";

export class Message implements MessageType {
  text: string;
  createdAt: number;
  constructor(text: string, createdAt: number) {
    this.text = text;
    this.createdAt = createdAt;
  }
}

export class LocationMessage implements LocationMessageType {
  url: string;
  createdAt: number;
  constructor(url: string, createdAt: number) {
    this.url = url;
    this.createdAt = createdAt;
  }
}
