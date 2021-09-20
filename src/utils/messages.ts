import { LocationMessage, Message } from "../models";

export const generateMessage = (text: string) => {
  return new Message(text, new Date().getTime());
};

export const generateLocationMessage = (url: string) => {
  return new LocationMessage(url, new Date().getTime());
};
