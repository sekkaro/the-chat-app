import { LocationMessage, Message } from "../models";

export const generateMessage = (text: string, username: string) => {
  return new Message(text, new Date().getTime(), username);
};

export const generateLocationMessage = (url: string, username: string) => {
  return new LocationMessage(url, new Date().getTime(), username);
};
