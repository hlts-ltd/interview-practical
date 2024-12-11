import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // check location of user.json
    const filePath = path.join(process.cwd(), "storage/database/users.json");
    const fileData = await readFile(filePath, "utf-8");

    // Parsing the file and return user data
    const users = JSON.parse(fileData);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error reading users.json:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
