import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useTaskCompletions() {
  return useQuery({
    queryKey: [api.taskCompletions.list.path],
    queryFn: async () => {
      const res = await fetch(api.taskCompletions.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch task completions");
      return api.taskCompletions.list.responses[200].parse(await res.json());
    },
  });
}

export function useToggleTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { date: string; taskId: string; completed: boolean }) => {
      const validated = api.taskCompletions.toggle.input.parse(data);
      const res = await fetch(api.taskCompletions.toggle.path, {
        method: api.taskCompletions.toggle.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to toggle task");
      return api.taskCompletions.toggle.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.taskCompletions.list.path] });
    },
  });
}
