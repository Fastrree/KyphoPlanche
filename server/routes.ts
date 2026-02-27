import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Weight Logs
  app.get(api.weightLogs.list.path, async (req, res) => {
    const logs = await storage.getWeightLogs();
    res.json(logs);
  });

  app.post(api.weightLogs.create.path, async (req, res) => {
    try {
      const input = api.weightLogs.create.input.parse(req.body);
      const log = await storage.createWeightLog(input);
      res.status(201).json(log);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.delete(api.weightLogs.delete.path, async (req, res) => {
    await storage.deleteWeightLog(Number(req.params.id));
    res.status(204).end();
  });

  // Planche Lean Logs
  app.get(api.plancheLeanLogs.list.path, async (req, res) => {
    const logs = await storage.getPlancheLeanLogs();
    res.json(logs);
  });

  app.post(api.plancheLeanLogs.create.path, async (req, res) => {
    try {
      const input = api.plancheLeanLogs.create.input.parse(req.body);
      const log = await storage.createPlancheLeanLog(input);
      res.status(201).json(log);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.delete(api.plancheLeanLogs.delete.path, async (req, res) => {
    await storage.deletePlancheLeanLog(Number(req.params.id));
    res.status(204).end();
  });

  // Tuck Planche Logs
  app.get(api.tuckPlancheLogs.list.path, async (req, res) => {
    const logs = await storage.getTuckPlancheLogs();
    res.json(logs);
  });

  app.post(api.tuckPlancheLogs.create.path, async (req, res) => {
    try {
      const input = api.tuckPlancheLogs.create.input.parse(req.body);
      const log = await storage.createTuckPlancheLog(input);
      res.status(201).json(log);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.delete(api.tuckPlancheLogs.delete.path, async (req, res) => {
    await storage.deleteTuckPlancheLog(Number(req.params.id));
    res.status(204).end();
  });

  // Workout Notes
  app.get(api.workoutNotes.list.path, async (req, res) => {
    const notes = await storage.getWorkoutNotes();
    res.json(notes);
  });

  app.post(api.workoutNotes.create.path, async (req, res) => {
    try {
      const input = api.workoutNotes.create.input.parse(req.body);
      const note = await storage.createWorkoutNote(input);
      res.status(201).json(note);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  app.delete(api.workoutNotes.delete.path, async (req, res) => {
    await storage.deleteWorkoutNote(Number(req.params.id));
    res.status(204).end();
  });

  // Task Completions
  app.get(api.taskCompletions.list.path, async (req, res) => {
    const completions = await storage.getTaskCompletions();
    res.json(completions);
  });

  app.post(api.taskCompletions.toggle.path, async (req, res) => {
    try {
      const input = api.taskCompletions.toggle.input.parse(req.body);
      const completion = await storage.toggleTaskCompletion(input.date, input.taskId, input.completed);
      res.json(completion);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      throw err;
    }
  });

  // Reset
  app.post(api.taskCompletions.reset.path, async (req, res) => {
    await storage.resetAllData();
    res.status(204).end();
  });

  // Seed DB if empty
  try {
    const existingNotes = await storage.getWorkoutNotes();
    if (existingNotes.length === 0) {
      const today = new Date().toISOString().split('T')[0];
      await storage.createWorkoutNote({
        date: today,
        note: "Bugün antrenmana başladım! İlk günüm harika geçti. Postürüm üzerinde daha fazla çalışmalıyım."
      });
      await storage.createWeightLog({
        weight: "57.5"
      });
      await storage.createPlancheLeanLog({
        durationSeconds: 15
      });
    }
  } catch (error) {
    console.error("Failed to seed database:", error);
  }

  return httpServer;
}