"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import TaskForm from "./TaskForm";

export enum Status {
  "TO_DO" = "TO_DO",
  "IN_PROGRESS" = "IN_PROGRESS",
  "COMPLETED" = "COMPLETED",
}

export enum Priority {
  "LOW" = "LOW",
  "MEDIUM" = "MEDIUM",
  "HIGH" = "HIGH",
}

export interface Task {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: Date | undefined;
}

function CreateTask() {
  const client = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (task: Task) => axios.post("/api/task", task),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleCreateTask = async (task: Task) => {
    await createTaskMutation.mutateAsync(task);
  };
  return (
    <TaskForm
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={handleCreateTask}
      mode="create"
      isLoading={createTaskMutation.isLoading}
    />
  );
}

export default CreateTask;
