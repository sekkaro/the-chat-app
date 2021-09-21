import { UserReturn, UserType } from "../types";

const users: UserType[] = [];

export const addUser = (user: UserType): UserReturn => {
  const { username, room } = user;

  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  const existingUser = users.find(
    (user) => user.username === username && user.room === room
  );

  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  users.push(user);

  return {
    user,
  };
};

export const removeUser = (id: string): UserReturn => {
  const idx = users.findIndex((user) => user.id === id);

  if (idx === -1) {
    return {
      error: "User does not exist",
    };
  }

  return { user: users.splice(idx, 1)[0] };
};

export const getUser = (id: string) => users.find((user) => user.id === id);

export const getUsersInRoom = (room: string) =>
  users.filter((user) => user.room === room);
