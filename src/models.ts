import { LocationMessageType, MessageType, UserType } from "./types";

export class Message implements MessageType {
  text: string;
  createdAt: number;
  username: string;
  constructor(text: string, createdAt: number, username: string) {
    this.text = text;
    this.createdAt = createdAt;
    this.username = username;
  }
}

export class LocationMessage implements LocationMessageType {
  url: string;
  createdAt: number;
  username: string;
  constructor(url: string, createdAt: number, username: string) {
    this.url = url;
    this.createdAt = createdAt;
    this.username = username;
  }
}

export class User implements UserType {
  id: string;
  username: string;
  room: string;
  constructor(id: string, username: string, room: string) {
    this.id = id;
    this.username = username.trim().toLowerCase();
    this.room = room.trim().toLowerCase();
  }
}
