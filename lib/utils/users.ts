import { readFile } from "fs/promises";
import path from "path";
import { User } from "../../types/user";

export async function getUsers(): Promise<User[]> {
  const filePath = path.join(process.cwd(), "storage/database/users.json");
  const fileData = await readFile(filePath, "utf-8");
  return JSON.parse(fileData);
}
