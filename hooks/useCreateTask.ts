"use client";

import useBoardStore from "@/store/useBoardStore";
import { Task } from "@/types";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const useCreateTask = () => {
  const getBoards = useBoardStore((state) => state.getBoards);
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const createTaskMutation = useMutation({
    mutationFn: async (task: Task) => axios.post("/api/task", task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      getBoards();
    },
  });

  return { createTaskMutation, isOpen, setIsOpen };
};

export default useCreateTask;
