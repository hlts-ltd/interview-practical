// lib/schema.ts

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Define a `users` table
export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  bio: text("bio"),
  profilePic: text("profilePic"),
  phone: text("phone"),
});

// Define a `music` table with foreign keys to `users`
export const musicTable = sqliteTable("music", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  file: text("file").notNull(),
});
