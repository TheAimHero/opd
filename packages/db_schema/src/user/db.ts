import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

export const userTable = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    username: text("username").notNull(),
    displayUsername: text("display_username").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (t) => [unique("user_unique").on(t.username)],
);
