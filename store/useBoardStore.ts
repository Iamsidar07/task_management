import { getTodosGroupByColumn } from "@/lib/getTodosGroupByColumn";
import { Board, Column, TypedColumn, Task } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";

interface BoardStore {
  board: Board;
  getBoards: () => void;
  setBoardState: (board: Board) => void;
  updateInDB: (task: Task, columnId: TypedColumn) => void;
}

const useBoardStore = create<BoardStore>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoards: async () => {
    const board = await getTodosGroupByColumn();
    set({ board });
  },
  setBoardState: (board) => {
    set({ board });
  },
  updateInDB: async (task, column) => {
    try {
      await fetch("/api/task", {
        method: "PATCH",
        body: JSON.stringify({
          id: task._id,
          status: column,
        }),
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
    }
  },
}));

export default useBoardStore;
