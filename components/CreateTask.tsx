"use client";

import { ReactNode } from "react";
import TaskForm from "./TaskForm";
import { Task } from "@/types";
import useCreateTask from "@/hooks/useCreateTask";

interface Props {
  trigger?: ReactNode;
  task?: Task;
}

function CreateTask({ trigger, task }: Props) {
  const { createTaskMutation, isOpen, setIsOpen } = useCreateTask();

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
