"use client";

import useBoardStore from "@/store/useBoardStore";
import { Task } from "@/types";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const useCreateTask = () => {
  const queryClient = useQueryClient();
  const getBoards = useBoardStore((state) => state.getBoards);
  const [isOpen, setIsOpen] = useState(false);

  const createTaskMutation = useMutation({
    mutationFn: async (task: Task) => axios.post("/api/task", task),
    onSuccess: () => {
      getBoards();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { createTaskMutation, isOpen, setIsOpen };
};

export default useCreateTask;
