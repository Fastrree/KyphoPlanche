import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const weightLogs = pgTable("weight_logs", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  weight: text("weight").notNull(),
});

export const plancheLeanLogs = pgTable("planche_lean_logs", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
});

export const tuckPlancheLogs = pgTable("tuck_planche_logs", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
});

export const workoutNotes = pgTable("workout_notes", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(), // YYYY-MM-DD
  note: text("note").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const taskCompletions = pgTable("task_completions", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(), // YYYY-MM-DD
  taskId: text("task_id").notNull(), 
  completed: boolean("completed").default(true).notNull(),
});

export const insertWeightLogSchema = createInsertSchema(weightLogs).omit({ id: true, timestamp: true });
export const insertPlancheLeanLogSchema = createInsertSchema(plancheLeanLogs).omit({ id: true, timestamp: true });
export const insertTuckPlancheLogSchema = createInsertSchema(tuckPlancheLogs).omit({ id: true, timestamp: true });
export const insertWorkoutNoteSchema = createInsertSchema(workoutNotes).omit({ id: true, timestamp: true });
export const insertTaskCompletionSchema = createInsertSchema(taskCompletions).omit({ id: true });

export type WeightLog = typeof weightLogs.$inferSelect;
export type PlancheLeanLog = typeof plancheLeanLogs.$inferSelect;
export type TuckPlancheLog = typeof tuckPlancheLogs.$inferSelect;
export type WorkoutNote = typeof workoutNotes.$inferSelect;
export type TaskCompletion = typeof taskCompletions.$inferSelect;

export type InsertWeightLog = z.infer<typeof insertWeightLogSchema>;
export type InsertPlancheLeanLog = z.infer<typeof insertPlancheLeanLogSchema>;
export type InsertTuckPlancheLog = z.infer<typeof insertTuckPlancheLogSchema>;
export type InsertWorkoutNote = z.infer<typeof insertWorkoutNoteSchema>;
export type InsertTaskCompletion = z.infer<typeof insertTaskCompletionSchema>;
