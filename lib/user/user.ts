import { User, users } from "@/database";
import { faker } from "@faker-js/faker";

export function userlist() {
  return users.toArray();
}

export function finduserdetail(id: string) {
  const userById = Array.from(users).find((user) => user.id === id);
  return userById;
}

export function finduserbyname(name: string) {
  return users.findMany((user) => user.name === name);
}

export function updateuserdetail(details: User) {
  users.update(
    (row) => row.id === details.id,
    (row) => ({
      ...row,
      bio: details?.bio,
      name: details?.name,
      phone: details?.phone,
      profilePic: faker?.image.avatar(),
    })
  );

  return;
}
