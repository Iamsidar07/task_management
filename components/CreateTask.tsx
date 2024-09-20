"use client";

import { ReactNode, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import TaskForm from "./TaskForm";
import useBoardStore from "@/store/useBoardStore";
import { Task } from "@/types";

interface Props {
  trigger?: ReactNode;
  task?: Task;
}

function CreateTask({ trigger, task }: Props) {
  const getBoards = useBoardStore((state) => state.getBoards);
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (task: Task) => axios.post("/api/task", task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      getBoards();
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleCreateTask = async (task: Task) => {
    await createTaskMutation.mutateAsync(task);
  };
  return (
    <TaskForm
      trigger={trigger}
      task={task}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={handleCreateTask}
      mode="create"
      isLoading={createTaskMutation.isLoading}
    />
  );
}

export default CreateTask;
