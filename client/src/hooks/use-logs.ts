import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

// Helper generator for CRUD hooks
function createHooks(resource: any, listPath: string, createPath: string, deletePath: string) {
  const useList = () => useQuery({
    queryKey: [listPath],
    queryFn: async () => {
      const res = await fetch(listPath, { credentials: "include" });
      if (!res.ok) throw new Error(`Failed to fetch ${listPath}`);
      return resource.list.responses[200].parse(await res.json());
    },
  });

  const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data: any) => {
        const validated = resource.create.input.parse(data);
        const res = await fetch(createPath, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validated),
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Failed to create log`);
        return resource.create.responses[201].parse(await res.json());
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [listPath] }),
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id: number) => {
        const url = buildUrl(deletePath, { id });
        const res = await fetch(url, { method: "DELETE", credentials: "include" });
        if (!res.ok) throw new Error(`Failed to delete log`);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [listPath] }),
    });
  };

  return { useList, useCreate, useDelete };
}

export const weightHooks = createHooks(api.weightLogs, api.weightLogs.list.path, api.weightLogs.create.path, api.weightLogs.delete.path);
export const plancheLeanHooks = createHooks(api.plancheLeanLogs, api.plancheLeanLogs.list.path, api.plancheLeanLogs.create.path, api.plancheLeanLogs.delete.path);
export const tuckPlancheHooks = createHooks(api.tuckPlancheLogs, api.tuckPlancheLogs.list.path, api.tuckPlancheLogs.create.path, api.tuckPlancheLogs.delete.path);
export const workoutNoteHooks = createHooks(api.workoutNotes, api.workoutNotes.list.path, api.workoutNotes.create.path, api.workoutNotes.delete.path);

export function useResetData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.taskCompletions.reset.path, { method: "POST", credentials: "include" });
      if (!res.ok) throw new Error("Failed to reset data");
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
}
