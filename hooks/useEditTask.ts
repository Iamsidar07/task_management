"use client";

import useTaskStore from "@/store/useTaskStore";
import { Task } from "@/types";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";

const useEditTask = ({ id }: { id: string }) => {
  const getTasks = useTaskStore((state) => state.getTasks);

  const editTaskMutation = useMutation({
    mutationFn: async (task: Task) => axios.patch(`/api/task?id=${id}`, task),
    onSuccess: async () => {
      console.log("trying to revalidate");
      getTasks();
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  return { editTaskMutation, isOpen, setIsOpen };
};

export default useEditTask;
