"use client";
import { createContext, ReactNode, useContext } from "react";
import { Task } from "@/types";
import { useQuery } from "react-query";
import axios from "axios";

interface TaskContext {
  data: Task[];
  isLoading: boolean;
  isError: boolean;
}

const TaskContext = createContext<TaskContext>({
  data: [],
  isLoading: false,
  isError: false,
});

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get("/api/task");
      return response.data;
    },
  });
  return (
    <>
      <TaskContext.Provider
        value={{
          data,
          isLoading,
          isError,
        }}
      >
        {children}
      </TaskContext.Provider>
    </>
  );
};

export const useTaskContext = () => useContext(TaskContext);

export default TaskContextProvider;
