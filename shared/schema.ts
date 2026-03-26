import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  year: text("year").notNull(),
  route: text("route").notNull(),
  overview: text("overview").notNull(), // Microcopy for the project
  role: text("role").notNull(),
  imageUrl: text("image_url").notNull(), // Placeholder image
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

// No complex relations needed for this portfolio
