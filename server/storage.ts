import { db } from "./db";
import { eq, and } from "drizzle-orm";
import {
  weightLogs, plancheLeanLogs, tuckPlancheLogs, workoutNotes, taskCompletions,
  type InsertWeightLog, type WeightLog,
  type InsertPlancheLeanLog, type PlancheLeanLog,
  type InsertTuckPlancheLog, type TuckPlancheLog,
  type InsertWorkoutNote, type WorkoutNote,
  type InsertTaskCompletion, type TaskCompletion
} from "@shared/schema";

export interface IStorage {
  // Weight
  getWeightLogs(): Promise<WeightLog[]>;
  createWeightLog(log: InsertWeightLog): Promise<WeightLog>;
  deleteWeightLog(id: number): Promise<void>;
  
  // Planche Lean
  getPlancheLeanLogs(): Promise<PlancheLeanLog[]>;
  createPlancheLeanLog(log: InsertPlancheLeanLog): Promise<PlancheLeanLog>;
  deletePlancheLeanLog(id: number): Promise<void>;
  
  // Tuck Planche
  getTuckPlancheLogs(): Promise<TuckPlancheLog[]>;
  createTuckPlancheLog(log: InsertTuckPlancheLog): Promise<TuckPlancheLog>;
  deleteTuckPlancheLog(id: number): Promise<void>;
  
  // Workout Notes
  getWorkoutNotes(): Promise<WorkoutNote[]>;
  createWorkoutNote(note: InsertWorkoutNote): Promise<WorkoutNote>;
  deleteWorkoutNote(id: number): Promise<void>;
  
  // Task Completions
  getTaskCompletions(): Promise<TaskCompletion[]>;
  toggleTaskCompletion(date: string, taskId: string, completed: boolean): Promise<TaskCompletion>;
  
  // Reset
  resetAllData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getWeightLogs(): Promise<WeightLog[]> {
    return await db.select().from(weightLogs);
  }
  async createWeightLog(log: InsertWeightLog): Promise<WeightLog> {
    const [result] = await db.insert(weightLogs).values(log).returning();
    return result;
  }
  async deleteWeightLog(id: number): Promise<void> {
    await db.delete(weightLogs).where(eq(weightLogs.id, id));
  }

  async getPlancheLeanLogs(): Promise<PlancheLeanLog[]> {
    return await db.select().from(plancheLeanLogs);
  }
  async createPlancheLeanLog(log: InsertPlancheLeanLog): Promise<PlancheLeanLog> {
    const [result] = await db.insert(plancheLeanLogs).values(log).returning();
    return result;
  }
  async deletePlancheLeanLog(id: number): Promise<void> {
    await db.delete(plancheLeanLogs).where(eq(plancheLeanLogs.id, id));
  }

  async getTuckPlancheLogs(): Promise<TuckPlancheLog[]> {
    return await db.select().from(tuckPlancheLogs);
  }
  async createTuckPlancheLog(log: InsertTuckPlancheLog): Promise<TuckPlancheLog> {
    const [result] = await db.insert(tuckPlancheLogs).values(log).returning();
    return result;
  }
  async deleteTuckPlancheLog(id: number): Promise<void> {
    await db.delete(tuckPlancheLogs).where(eq(tuckPlancheLogs.id, id));
  }

  async getWorkoutNotes(): Promise<WorkoutNote[]> {
    return await db.select().from(workoutNotes);
  }
  async createWorkoutNote(note: InsertWorkoutNote): Promise<WorkoutNote> {
    const [result] = await db.insert(workoutNotes).values(note).returning();
    return result;
  }
  async deleteWorkoutNote(id: number): Promise<void> {
    await db.delete(workoutNotes).where(eq(workoutNotes.id, id));
  }

  async getTaskCompletions(): Promise<TaskCompletion[]> {
    return await db.select().from(taskCompletions);
  }
  async toggleTaskCompletion(date: string, taskId: string, completed: boolean): Promise<TaskCompletion> {
    // Check if it exists
    const existing = await db.select().from(taskCompletions).where(
      and(eq(taskCompletions.date, date), eq(taskCompletions.taskId, taskId))
    );
    
    if (existing.length > 0) {
      const [updated] = await db.update(taskCompletions)
        .set({ completed })
        .where(eq(taskCompletions.id, existing[0].id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(taskCompletions)
        .values({ date, taskId, completed })
        .returning();
      return created;
    }
  }

  async resetAllData(): Promise<void> {
    await db.delete(weightLogs);
    await db.delete(plancheLeanLogs);
    await db.delete(tuckPlancheLogs);
    await db.delete(workoutNotes);
    await db.delete(taskCompletions);
  }
}

export const storage = new DatabaseStorage();