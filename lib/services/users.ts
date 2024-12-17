import { User, users } from "@/database";

export async function getUsers() {
  return users.toArray();
}

export async function getUser(id: string) {
  return users.find((user: User) => user.id === id);
}

export async function updateUser(details: Partial<User>, id: string) {
  const song = users.update(details, (row) => row.id === id);

  return song[0];
}

export function deleteUser(user: User) {
  return users.delete(user);
}
