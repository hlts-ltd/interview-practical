import { readFile, writeFile } from "fs/promises";
import path from 'node:path';
import { User } from "@/types/user";

export function storage(pathname: string): string {
  return path.resolve(process.env.ROOT_DIR, './storage/', pathname);
}

const USERS_FILE_PATH = path.join(process.cwd(), "storage/database/users.json");

export async function readUsersFromFile(): Promise<User[]> {
  try {
    const fileData = await readFile(USERS_FILE_PATH, "utf-8");
    return JSON.parse(fileData) as User[];
  } catch (error) {
    console.error("Error reading users file:", error);
    throw new Error("Failed to read users file.");
  }
}

export async function writeUsersToFile(users: User[]): Promise<void> {
  try {
    await writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing users file:", error);
    throw new Error("Failed to write users file.");
  }
}