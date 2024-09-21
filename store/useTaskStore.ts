import { Task } from "@/types";
import { create } from "zustand";

interface TaskStore {
  tasks: Task[] | null;
  getTasks: () => void;
  isLoading: boolean;
  isError: boolean;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: null,
  getTasks: async () => {
    try {
      const response = await fetch("/api/task");
      const data = await response.json();
      if (response.status === 200) {
        set({ tasks: data });
      }
    } catch (error) {
      console.log(error);
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
  isError: false,
  isLoading: false,
}));

export default useTaskStore;
