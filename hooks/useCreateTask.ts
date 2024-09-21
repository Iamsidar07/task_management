"use client";

import useBoardStore from "@/store/useBoardStore";
import useTaskStore from "@/store/useTaskStore";
import { Task } from "@/types";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";

const useCreateTask = () => {
  const getBoards = useBoardStore((state) => state.getBoards);
  const getTasks = useTaskStore((state) => state.getTasks);

  const [isOpen, setIsOpen] = useState(false);

  const createTaskMutation = useMutation({
    mutationFn: async (task: Task) => axios.post("/api/task", task),
    onSuccess: () => {
      getBoards();
      getTasks();
    },
  });

  return { createTaskMutation, isOpen, setIsOpen };
};

export default useCreateTask;
