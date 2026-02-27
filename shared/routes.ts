import { z } from 'zod';
import {
  insertWeightLogSchema,
  insertPlancheLeanLogSchema,
  insertTuckPlancheLogSchema,
  insertWorkoutNoteSchema,
  weightLogs,
  plancheLeanLogs,
  tuckPlancheLogs,
  workoutNotes,
  taskCompletions
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  weightLogs: {
    list: {
      method: 'GET' as const,
      path: '/api/weight-logs' as const,
      responses: { 200: z.array(z.custom<typeof weightLogs.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/weight-logs' as const,
      input: insertWeightLogSchema,
      responses: { 201: z.custom<typeof weightLogs.$inferSelect>(), 400: errorSchemas.validation },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/weight-logs/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound },
    }
  },
  plancheLeanLogs: {
    list: {
      method: 'GET' as const,
      path: '/api/planche-lean-logs' as const,
      responses: { 200: z.array(z.custom<typeof plancheLeanLogs.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/planche-lean-logs' as const,
      input: insertPlancheLeanLogSchema,
      responses: { 201: z.custom<typeof plancheLeanLogs.$inferSelect>(), 400: errorSchemas.validation },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/planche-lean-logs/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound },
    }
  },
  tuckPlancheLogs: {
    list: {
      method: 'GET' as const,
      path: '/api/tuck-planche-logs' as const,
      responses: { 200: z.array(z.custom<typeof tuckPlancheLogs.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/tuck-planche-logs' as const,
      input: insertTuckPlancheLogSchema,
      responses: { 201: z.custom<typeof tuckPlancheLogs.$inferSelect>(), 400: errorSchemas.validation },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/tuck-planche-logs/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound },
    }
  },
  workoutNotes: {
    list: {
      method: 'GET' as const,
      path: '/api/workout-notes' as const,
      responses: { 200: z.array(z.custom<typeof workoutNotes.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/workout-notes' as const,
      input: insertWorkoutNoteSchema,
      responses: { 201: z.custom<typeof workoutNotes.$inferSelect>(), 400: errorSchemas.validation },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/workout-notes/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound },
    }
  },
  taskCompletions: {
    list: {
      method: 'GET' as const,
      path: '/api/task-completions' as const,
      responses: { 200: z.array(z.custom<typeof taskCompletions.$inferSelect>()) },
    },
    toggle: {
      method: 'POST' as const,
      path: '/api/task-completions/toggle' as const,
      input: z.object({
        date: z.string(),
        taskId: z.string(),
        completed: z.boolean()
      }),
      responses: { 200: z.custom<typeof taskCompletions.$inferSelect>() },
    },
    reset: {
      method: 'POST' as const,
      path: '/api/reset' as const,
      responses: { 204: z.void() },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
