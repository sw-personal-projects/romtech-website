import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});


export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});


// #create relations
// announcement to user
export const announcementRelations = relations(announcements, ({ one }) => ({
  user: one(users, {
    fields: [announcements.userId],
    references: [users.id],
  }),
}));

// user to announcements
export const userRelations = relations(users, ({ many }) => ({
    announcements: many(announcements),
  }));
  



